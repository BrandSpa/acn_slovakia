import React from 'react';

const Modal = React.createClass({
	getInitialState(){
		return {
			show: false
		}
	},

	close(e) {
		e.preventDefault();
		this.setState({show: false});
	},

	show() {
		this.setState({show: true});
	},

	render() {
		let {url} = this.props;

		return (
			<div className={this.state.show ? "modal modal--show" : "modal"}>
				<a className="modal__close" onClick={this.close}>
					<i className="ion-close"></i>
				</a>

					<div className="iframe-container">
					{this.state.show ? 
						<iframe
							src={`${url}?autoplay=1`}
							frameborder="0" 
							height="315" 
							width="100%" 
							allowfullscreen
						></iframe>			
						: ''}		
					</div>
				
			</div>
		)
	}
});

export default Modal;