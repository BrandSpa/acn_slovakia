import React from 'react';
import VideoModal from './videoModal';

const VideoHeader = React.createClass({
	openModal(e) {
		e.preventDefault();
		this.modal.show();
	},

	render() {
		let props = {
			imgUrl: '',
      url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
		};

		let style = {
			backgroundImage: `url(${props.imgUrl})`
			backgroundPosition: 'cover',
			height: `${window.innerHeight - 100}px`,
			width: '100%',
			position: 'relative',
			cursor: 'pointer'
		};
		

		return (
			<div>
				<VideoModal ref={modal => this.modal = modal} url={this.props.url} />
				<div style={style} onClick={this.openModal}></div>
			</div>
		)
	}
});

export default VideoHeader;