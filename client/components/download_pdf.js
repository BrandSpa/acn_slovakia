import React from 'react';
import request from 'axios';
import isEmpty from 'validator/lib/isEmpty';
import getCountries from '../lib/getCountries';
import qs from 'qs';
const endpoint = '/wp-admin/admin-ajax.php';

const DownloadPdf = React.createClass({

	getDefaultProps() {
		return {
			btn: {
				text: '',
				background: ''
			},
			texts: {},
			countries: getCountries,
			pdf_url: ''
		}
	},

	getInitialState() {
		const { country } = this.props;

		return {
			email: '',
			errors: {
				email: false
			},
			country
		}
	},
	
	validate() {
    let errors = {};

    let validations = Object.keys(this.state.errors).map(field => {
      let val = isEmpty(field);
      errors = {...errors, [field]: val};
      return val;
    });

    this.setState({errors});
		console.log('validate');
    return Promise.all(validations);
  },

	isValid() {
    return this
      .validate()
      .then(arr => arr.every(item => item == false))
      .catch(err => console.error(err));
  },

	handlepdf(e) {
		e.preventDefault();
		this.isValid().then(this.storeContact);
	},

	storeContact(isValid) {
		const {	email, country } = this.state;
		let mc_data = {
    	email_address: email,
    	status: 'subscribed',
    	merge_fields: {NAME: '', COUNTRY: country},
    	update_existing: true
    };

    let data = qs.stringify({action: 'mailchimp_subscribe', data: mc_data});

		if(isValid) {
			request
			.post(endpoint, data)
			.then(res => {
				if (res.data.id) window.location = this.props.pdf_url;
			});
		}
	},

	handleChange(field, e) {
		this.setState({...this.state, [field]: e.target.value});
	},

	render() {
		const { countries, btn, texts } = this.props;
		const { errors } = this.state;

		let btnStyle = {
			borderColor: btn.background,
			background: btn.background,
			marginLeft: '-2px',
			borderRadius: '3px'
		};

		return (
			<form onSubmit={this.handlepdf} className="form-inline download-pdf">
			<div className="input-container">
					<input 
						type="text"
						placeholder={texts.email} 
						onChange={this.handleChange.bind(null, 'email')} 
						value={this.state.email}
					/>
					<div className={errors.email ? 'input-error' : 'hidden'}>
            { errors.email } { texts.validation_email }
          </div>
				</div>

				<div className="input-container">
					<select 
						onChange={this.handleChange.bind(null, 'country')}
						value={this.state.country || this.props.country}
					>
						{countries.map(country => <option value={country}>{country}</option>)}
					</select>
				</div>
				<button 
					onClick={this.handlepdf} 
					style={btnStyle}>{btn.text}</button>
			</form>
		)
	}
})

export default DownloadPdf;