import React from 'react';
import VideoModal from './video_modal';

const SectionVideo = React.createClass({
	getDefaultProps() {
		return {
			'imgUrl': 'http://acninternational.org/wp-content/uploads/2017/02/Play.png',
			'url': 'https://www.youtube.com/embed/_lQvw2vSDbs'
		}
	},

	showVideo(e) {
		e.preventDefault();
		this.modal.show()
	},
	
	render() {
		let linkStyle = {
			display: 'flex',
			width: '100px',
			height: '70px',
			margin: '0 auto',
			background: `url(${this.props.imgUrl})`,
			backgroundSize: 'cover'
		};

		return (
			<div >
				<VideoModal ref={modal => this.modal = modal} url={this.props.url} />
				<a href="#" style={linkStyle} onClick={this.showVideo}></a>
			</div>
		)
	}
});

export default SectionVideo;