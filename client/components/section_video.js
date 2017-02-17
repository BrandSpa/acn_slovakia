import React from 'react';
import VideoModal from './video_modal';

const SectionVideo = React.createClass({
	getDefaultProps() {
		return {
			imgUrl: 'http://acninternational.org/wp-content/uploads/2017/02/Play.png',
			url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
			imageStyle: {}
		}
	},

	showVideo(e) {
		e.preventDefault();
		this.modal.show()
	},
	
	render() {
		let linkStyle = {};

		let imageStyle = {
			width: '100px',
			margin: '0 auto'
		};

		imageStyle = {...imageStyle, ...this.props.imageStyle};
		
		return (
			<div >
				<VideoModal ref={modal => this.modal = modal} url={this.props.url} />
				<a href="#" style={linkStyle} onClick={this.showVideo}>
					<img style={imageStyle} src={this.props.imgUrl} alt="" />
				</a>
			</div>
		)
	}
});

export default SectionVideo;