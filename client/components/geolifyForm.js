import React from 'react';

const GeolifyForm = react.createClass({
	getDefaultProps() {
		return {
			countries: [''],
			urls: []
		}
	},

	addCountry(e) {
		e.preventDefault();
		let countries = this.state.countries.concat(['']);
		this.setState({countries});
	},

	render() {
		return (
			<form action="">
				{this.props.countries.map((country, i) => {
					return <input placeholder="Country" />
				})}
				<button onClick={this.addCountry}>Add</button>
			</form>
		)
	}
});

export default GeolifyForm;