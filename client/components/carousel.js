import React from 'react';

const Carousel = React.createClass({

	getInitialState() {
    return {
			currentSlide: 0, 
			left: '0',
			viewportWidth: '100%'
		};
  },

	componentDidMount() {
		const num = $('.bs-carousel-item').length;
		$('.bs-carousel-item').css({'width': '100%'});
		this.setState({viewportWidth: `${num * 100}%`});
	},

	render() {
		 let viewportStyle = {
      width: this.state.viewportWidth,
      left: this.state.left
    };

		return (
			<div>
			<div style={viewportStyle}>
				<div dangerouslySetInnerHTML={{__html: this.props.content}} />
			</div>
			</div>
		)
	}
});

export default Carousel;