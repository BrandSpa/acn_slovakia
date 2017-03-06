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

	componentDidMount() {
		console.log(this.props);
	},

	addCountry(e) {
		e.preventDefault();
		let countriesLength = this.state.countriesLength + 1;
		this.setState({countriesLength});
	},

	handleChange() {

	},

	renderInput(i = 0) {
		return (
			<p>
				<input name="countries[]" placeholder="added" onChange={this.handleChange} value='nea 1' />
			</p>
		);
	},

	render() {

		return (
			<form action="">
				{this.renderInput()}
				{this.props.countries.map((country, i) => {
					return this.renderInput(i)
				})}
				<button onClick={this.addCountry}>Add</button>
			</form>
		)
	}
});

export default GeolifyForm;