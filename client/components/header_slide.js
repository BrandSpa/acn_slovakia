import React from 'react';
import VideoModal from './video_modal';

const headerSlide = React.createClass({
	handleLink(e) {
		e.preventDefault();
		if(this.props.isVideo) console.log('video open modal', this.refs);
		console.log('redirect to url');
	},

	render() {
		const {imgUrl, title, subtitle, url, width, height} = this.props;
		let bg = `url(${imgUrl})`;
		let style = {'backgroundImage': bg, backgroundSize: 'cover', width, height};

		return (
			<a href="#" onClick={this.handleLink}>
				{this.props.isVideo ? <VideoModal ref="modal" url={this.props.url} /> : ''}
				<div className="slider__slide" style={style}>
					<h2>{title}</h2>
					<h3>{subtitle}</h3>
				</div>
			</a>
		)
	}
});

export default headerSlide;