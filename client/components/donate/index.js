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
				card_type: 'visa',
				number: '',
				exp_month: '',
				exp_year: '',
				cvc: '',
				token: ''
			},
			texts: {},
			errors: {
				stripe: {},
				contact: {}
			}
		}
	},


	fetchCountries() {
		$.ajax({
			url: '/wp-admin/admin-ajax.php',
			data: {action: 'countries'}
		}).then(res => this.setState({countries: res}));
	},

	componentWillMount(){
		this.fetchCountries();
	},

	onlyNum(val) {
		return val.replace(/[^0-9]+/, '');
	},

	maxLength(val, length) {
		return val.substring(0, length);
	},

	handleChange(field) {
		this.setState({...this.state, ...field});
	},

	handleSubmit() {
		this.nextSection();
			// let data = {
			// 	action: 'stripe_token',
			// 	data: this.state.stripe
			// };

			// $.ajax({
			// 	type: 'post',
			// 	url: '/wp-admin/admin-ajax.php',
			// 	data: data
			// })
			// .then(res => this.setState({stripe: {...this.state.stripe, token: res.id}}))
			// .then(res => this.stripeCharge())
			// .then(res => console.log(res));
	},

	stripeCharge() {
		const { contact, currency, amount, donation_type, stripe: {token} } = this.state;
		let data = { ...contact, currency, amount, donation_type, stripe_token: token};

		let request = $.ajax({
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: {
				action: 'stripe_charge',
				data: data
		}});

		return request;
	},

	nextSection() {
		let section = this.state.section < 2 ? this.state.section + 1 : 2; 
		let left = `-${section * 100}%`;
		this.setState({section, left});
	},

	prevSection() {
		let section = this.state.section > 0 ? this.state.section - 1 : 0; 
		let left = `-${section * 100}%`;
		this.setState({section, left}
	}

	render() {
		return (
			<div style={{overflow: 'hidden'}}>
			<div className="donate_landing__viewport" style={{width: '300%', left: this.state.left}}>
				<Amount
					{...this.state}
					{...this.props}
					onlyNum={this.onlyNum} 
					onChange={this.handleChange}
				/>

				<CreditCard 
					{...this.state}
					{...this.props}
					onlyNum={this.onlyNum} 
					maxLength={this.maxLength}
					onChange={this.handleChange} 
					validateStripe={this.validateStripe}
				/>

				<Contact
					{...this.state}
					{...this.props}
					onChange={this.handleChange} 
				 />
				</div> 
				 <div className="form-group">
					 <button 
					 	className="donate_landing__submit pull-left" 
						 onClick={this.handleSubmit}
						>
						Donate
					</button>
					{this.state.section > 1 ? <button onClick={this.prevSection}>Back</button> : ''}
				 </div>
				 
			</div>
		)
	}

});

export default Donate;