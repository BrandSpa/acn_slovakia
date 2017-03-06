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
				<input name="countries[]" placeholder="added" onChange={this.handleChange.bind(null, i)} value='nea 1' />
				<button onClick={this.handleRemove.bind(null, i)}>remove</button>
			</p>
		);
	},

	render() {
		return (
			<div>
				{this.renderInput()}
				{this.state.countries.map((country, i) => {
					return this.renderInput(i)
				})}
				<button onClick={this.handleAdd}>Add</button>
			</div>
		)
	}
});

export default GeolifyForm;