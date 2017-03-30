import React from 'react';
import VideoModal from './videoModal';

const VideoHeader = React.createClass({
	getDefaultProps() {
		return {
			videoUrl: '',
			imageUrl: ''
		}
	},

	openModal(e) {
		e.preventDefault();
		this.modal.show();
	},

	render() {
		const {videoUrl, imageUrl} = this.props;
		let style = {
			backgroundImage: `url(${imageUrl})`,
			backgroundPosition: 'cover',
			height: `${window.innerHeight - 100}px`,
			width: '100%',
			position: 'relative',
			cursor: 'pointer'
		};

		return (
			<div>
				<VideoModal ref={modal => this.modal = modal} url={videoUrl} />
				<div style={style} onClick={this.openModal}>
			
				<div style={{background: 'rgba(60,81,90, .5)', width: '100%', 'padding': '10px 0'}}>
					<div className="l-wrap" style={{color: '#fff', fontSize: '18px'}}>
						Video <i className="ion-ios-videocam"></i> 
					</div>
				</div>
				</div>
			</div>
		)
	}
});

export default VideoHeader;