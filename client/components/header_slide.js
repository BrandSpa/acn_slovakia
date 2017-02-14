import React from 'react';

const headerSlide = React.createClass({
	render() {
		const {imgUrl, title, subtitle, width, height} = this.props;
		let bg = `url(${imgUrl})`;
		let style = {'backgroundImage': bg, backgroundSize: 'cover', width, height}
		return (
			<div className="slider__slide" style={style}>
				<h2>{title}</h2>
				<h3>{subtitle}</h3>
			</div>
		)
	}
});

export default headerSlide;