import React from 'react';

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
			urls: []
		}
	},

	componentDidMount() {
		this.setState({...this.props});
	},

	handleChange(ind, e) {
		console.log('input ', ind);
	},

	renderInput(i = 0) {
		return (
			<p>
				<input name="countries[]" placeholder="added" onChange={this.handleChange.bind(null, i)} value='nea 1' />
				<button onClick={this.removeNode.bind(null, i)}>remove</button>
			</p>
		);
	},

	render() {

		return (
			<form action="">
				{this.renderInput()}
				{this.state.countries.map((country, i) => {
					return this.renderInput(i)
				})}
				<button onClick={this.addCountry}>Add</button>
			</form>
		)
	}
});

export default GeolifyForm;