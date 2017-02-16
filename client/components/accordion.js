import React from 'react';

const Accordion = React.createClass({
	getInitialState() {
		return {
			show: false
		}
	},

	componentDidMount() {
		return {
			content: '',
			btnTitle: 'Toggle'
		}
	},

	toggle() {
		this.setState({ show: !this.state.show });
	},

	render() {
		const { content, btnTitle } = this.props;

		return (
			<div className="accordion">
				<button 
					className="accordion__btn"
					style={{ width: '100%', height: '60px', border: 'none', background: '#687f87', borderRadius: '0', fontSize: '18px', fontWeight: 'normal' }} 
					onClick={this.toggle}
				>
					{btnTitle}  <i className={ this.state.show  ? "ion-chevron-up" : "ion-chevron-down" }></i>
				</button>
				<div style={this.state.show ? {display: 'block'} : {display: 'none'}}>
					<div dangerouslySetInnerHTML={{__html: content}} />
				</div>
			</div>
		)
	}
});

export default Accordion;