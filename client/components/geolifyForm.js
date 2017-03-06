import React from 'react';

const GeolifyForm = React.createClass({
	getInitialState(){
		return {
			countriesLength: 1
		}
	},

	getDefaultProps() {
		return {
			countries: [''],
			urls: []
		}
	},

	addCountry(e) {
		e.preventDefault();
		let countriesLength = this.state.countriesLength + 1;
		this.setState({countriesLength});
	},

	render() {
		let nodes = [];
		for(var i = 0; i <= countriesLength; i++) {
			nodes.concat([<input placeholder="added" />])
		};

		return (
			<form action="">
				{this.props.countries.map((country, i) => {
					return <input placeholder="Country" />;
				})}
				{nodes};
				<button onClick={this.addCountry}>Add</button>
			</form>
		)
	}
});

export default GeolifyForm;