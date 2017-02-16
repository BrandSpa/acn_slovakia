import React from 'react';

const Accordion = React.createClass({
	getIntialState() {
		return {
			show: false
		}
	},

	componentDidMount() {
		return {
			content: ''
		}
	},

	toggle() {
		this.setState({ show: !this.state.show });
	},

	render() {
		const { content } = this.props;

		return (
			<div>
				<button style={{ width: '100%', border: 'none', background: '#687f87' }} onClick={this.toggle}>toggle</button>
				<div style={this.state.show ? {display: 'block'} : {display: 'none'}}>
					<div dangerouslySetInnerHTML={{__html: content}} />
				</div>
			</div>
		)
	}
})