import React from 'react';
import validator from 'validator';
import qs from 'qs';
import request from 'axios';
import Amount from './amount';
import CreditCard from './credit_card';
import Contact from './contact';

const Donate = React.createClass({
	getInitialState() {
		return {
			section: 0,
			left: 0,
			donation_type: 'monthly',
			amount: 30,
			currency: 'usd',
			countries: [],
			contact: {
				name: '',
				email: '',
				country: ''
			},
			stripe: {
				card_type: '',
				number: '',
				exp_month: '',
				exp_year: '',
				cvc: '',
				token: ''
			},
			errors: {
				stripe: {},
				contact: {}
			}
		}
	},

	getDefaultProps() {
		return {
			texts: {}
		}
	},

	fetchCountries() {
		const data = qs.stringify({action: 'countries'});

		return request
			.post('/wp-admin/admin-ajax.php', data)
			.then(res => { 
				this.setState({countries: res.data });
				return res.data;
			});
	},

	componentWillMount(){
		this.fetchCountries();
	},

	handleChange(field) {
		this.setState({...this.state, ...field});
	},

	handleSubmit(e) {
		e.preventDefault();
		this.nextSection();
	},

	stripeToken() {
		let data = qs.stringify({ 
			action: 'stripe_token', 
			data: this.state.stripe 
		});

		return request
			.post('/wp-admin/admin-ajax.php', data)
			.then(res => { 
				const stripe = { ...this.state.stripe, token: res.data.id };
				this.setState({ stripe });
			});
	},

	stripeCharge() {
		const { contact, currency, amount, donation_type, stripe: {token} } = this.state;
		let data = { ...contact, currency, amount, donation_type, stripe_token: token};
		let dataAjax = qs.stringify({ action: 'stripe_charge', data });
		console.log(dataAjax);
		return request.post('/wp-admin/admin-ajax.php', dataAjax);
	},

	completeTransaction(stripeResponse = {}) {
		const type = this.state.donation_type;
		const base = this.props.redirect[type];
		const { customer, id } = stripeResponse;
		const { amount } = this.state;

		if(typeof ga !== 'undefined') {
			ga('ecommerce:addTransaction', {
				'id': `${this.contact.email}-${id}`,                 
				'affiliation': 'ACN International',
				'revenue': amount,
				'currency': 'USD'
			});

			ga('ecommerce:send');
		}

		let url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
		window.location = url;
	},

	creditCardIsValid() {
		let errs = this.creditCard.allValidations();
		return Object.keys(errs.stripe)
			.every(key => errs.stripe[key] == true);
	},

	contactIsValid() {
		let errs = this.contact.validateAll();
		return Object.keys(errs.contact)
			.every(key => errs.contact[key] == true);
	},

	nextSection() {
		let section = this.state.section < 2 ? this.state.section + 1 : 2;

		if(this.state.section == 1){
			if(!this.creditCardIsValid()) return false;
			this.stripeToken();
		} 

		if(this.state.section == 2) {
			if(!this.contactIsValid()) return false;
			this.stripeCharge().then(res => console.log('charge', res.data));
		}

		let left = `-${section * 100}%`;
		this.setState({section, left});
	},

	prevSection(e) {
		e.preventDefault();
		let section = this.state.section >= 0 ? this.state.section - 1 : 0; 
		let left = `-${section * 100}%`;
		this.setState({section, left});
	},

	render() {
		let sectionWidth = `${100 / 3}%`;

		return (
			<form onSubmit={this.handleSubmit} className="donate_react" style={{overflow: 'hidden'}}>
				<div className="donate_react__viewport" style={{width: '300%', left: this.state.left}} >

				<Amount
					{...this.state}
					{...this.props}
					width={sectionWidth}
					onChange={this.handleChange}
				/>

				<CreditCard
					ref={creditCard => this.creditCard = creditCard}
					{...this.state}
					{...this.props}
					width={sectionWidth}
					onChange={this.handleChange} 
				/>

				<Contact
					ref={contact => this.contact = contact}
					{...this.state}
					{...this.props}
					width={sectionWidth}
					onChange={this.handleChange} 
				 />

				</div>

				 <div className="form-group">
					 <button 
					 	className="donate_react__submit pull-left" 
						 onClick={this.handleSubmit}
						>
						{ this.state.section == 1 ? this.props.texts.next : this.props.texts.donate }
					</button>
					{ `${this.state.amount} USD ${this.props.texts[this.state.donation_type]}` }
					{ this.state.section > 0 ? <button style={{ float: 'right' }} onClick={this.prevSection}>{this.props.texts.back}</button> : '' }
				 </div>
				 
			</form>
		)
	}

});

export default Donate;