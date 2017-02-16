import React from 'react';
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas odit, qui dolorum molestiae, necessitatibus quam omnis reiciendis aspernatur repellat. Molestias iusto totam praesentium, culpa autem veritatis harum! Quo, enim, laudantium.
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
			<div>
				<button 
					style={{ width: '100%', border: 'none', background: '#687f87' }} 
					onClick={this.toggle}
				>
			
						{btnTitle} {this.state.show  ? <i className="ion-chevron-up"></i> : <i className="ion-chevron-down"></i>}
				</button>
				<div style={this.state.show ? {display: 'block'} : {display: 'none'}}>
					<div dangerouslySetInnerHTML={{__html: content}} />
				</div>
			</div>
		)
	}
});

export default Accordion;