import React from 'react';
import VideoModal from './videoModal';

const VideoHeader = React.createClass({
	render() {
		let props = {
			imgUrl: '',
      url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
      imageStyle: {
				
			}
	};
	
		return (
			<div>
				<VideoModal ref={modal => this.modal = modal} url={this.props.url} />

			</div>
		)
	}
});

export default VideoHeader;