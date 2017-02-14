import React from 'react';

const Modal = React.createClass({
	getInitialState(){
		
	},

	render() {
		let {url} = this.props;

		return (
			<div className="modal">
				<div className="modal__close">
					<i className="ion-close"></i>
					<div className="iframe-container">
						<iframe
							src={`${url}?autoplay=1`}
							frameborder="0" 
							height="315" 
							width="100%" 
							allowfullscreen
						></iframe>					
					</div>
				</div>
			</div>
		)
	}
});

export default Modal;