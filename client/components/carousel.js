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
		$('.bs-carousel-item').css({'width': `${100 / num}%`, 'float': 'left'});
		this.setState({viewportWidth: `${num * 100}%`});
	},

	render() {
		 let viewportStyle = {
      width: this.state.viewportWidth,
			transition: 'left 300ms',
      left: this.state.left
    };

		let btnStyle = {
			background: 'rgba(0,0,0, .5)',
			fontSize: '20px',
			color: '#fff',
			textAlign: 'center',
			width: '40px',
			height: '40px'
		};

		let btnLeft = {...btnStyle, left: '0'};
		let btnRight = {...btnStyle, right: '0'};

		return (
			<div style={{width: '100%', overflow: 'hidden'}}>
				<div style={viewportStyle}>
					<div dangerouslySetInnerHTML={{__html: this.props.content}} />
				</div>
				<div style={{position: 'absolute', top: '45%'}}>
					<span style={btnLeft}><i className="ion-chevron-left"></i></span>
					<span style={btnRight}><i className="ion-chevron-right"></i></span>
				</div>
			</div>
		)
	}
});

export default Carousel;