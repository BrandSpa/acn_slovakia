import React from 'react';
import request from 'axios';
import getCountries from '../lib/getCountries';
const endpoint = '/wp-admin/admin-ajax.php';

const DownloadPdf = React.createClass({
	getDefaultProps() {
		return {
			btn: {
				text: '',
				background: ''
			},
			texts: {},
			countries: getCountries
		}
	},

	getInitialState() {
		return {
			email: ''
		}
	},

	handlepdf(e) {
		e.preventDefault();
		const data = this.state;

		request
		.post(endpoint, data)
		.then(res => console.log(data));

	},

	handleChange(field, e) {
		this.setState({...this.state, [field]: e.target.value});
	},

	render() {
		const { countries, btn, texts } = this.props;

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