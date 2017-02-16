import React from 'react';
import VideoModal from './video_modal';

const SectionVideo = React.createClass({
	showVideo(e) {
		e.preventDefault();
		this.modal.show()
	},
	
	render() {
		let linkStyle = {
			display: 'flex',
			width: '100%',
			height: '100%',
			background: this.props.imgUrl,
			backgroundSize: 'cover'
		};

		return (
			<div>
				<VideoModal ref={modal => this.modal = modal} url={this.props.url} />
				<a href="#" style={linkStyle} onClick={this.showVideo}></a>
			</div>
		)
	}
});