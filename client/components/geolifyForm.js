import React from 'react';
import getCountries from '../lib/getCountries';

const GeolifyForm = React.createClass({
	getInitialState(){
		return {
			countries: [],
			urls: []
		}
	},

	getDefaultProps() {
		return {
			countries: [],
			urls: [],
			countriesList: getCountries()
		}
	},

	componentDidMount() {
		this.setState({...this.props});
	},

	handleChange(ind, type, e) {
		console.log(type, ind);
		let {countries, urls} = this.state;
		
		if(type == 'country') {
			countries[ind] = e.currentTarget.value;
		}

		if(type == 'url') {
			urls[ind] = e.currentTarget.value;
		}

		this.setState({countries, urls});
	},

	handleRemove() {
		console.log('input ', ind);
	},

	handleAdd(e) {
		e.preventDefault();
		let countries = this.state.countries.concat(['']);
		this.setState({countries});
	},

	renderInput(i = 0) {
		return (
			<p>
				<select 
					name="countries[]" 
					placeholder="Country" 
					onChange={this.handleChange.bind(null, i, 'country')} 
					value={this.state.countries[i]}
				>
				<option value="">Select country</option>
				{getCountries().map((co, i) => {
					<option key={i} value={co}>{co}</option>
				})}
				</select>
				<input name="urls[]" placeholder="url" onChange={this.handleChange.bind(null, i, 'url')} value={this.state.urls[i]} />
				<button onClick={this.handleRemove.bind(null, i)}>remove</button>
			</p>
		);
	},

	render() {
		return (
			<div>
				{this.state.countries.map((country, i) => {
					return this.renderInput(i)
				})}
				<button onClick={this.handleAdd}>Add</button>
			</div>
		)
	}
});

export default GeolifyForm;