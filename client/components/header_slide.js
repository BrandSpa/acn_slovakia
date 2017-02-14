import React from 'react';

const headerSlide = React.createClass({
	handleLink(e) {
		e.preventDefault();
		if(this.props.isVideo) console.log('video open modal');
		console.log('redirect to url');
	},

	render() {
		const {imgUrl, title, subtitle, url, width, height} = this.props;
		let bg = `url(${imgUrl})`;
		let style = {'backgroundImage': bg, backgroundSize: 'cover', width, height}
		return (
			<a href="#" onClick={this.handleLink}>
			<div className="slider__slide" style={style}>
				<h2>{title}</h2>
				<h3>{subtitle}</h3>
			</div>
			</a>
		)
	}
});

export default headerSlide;