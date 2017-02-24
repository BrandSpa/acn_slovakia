import React from 'react';
import SectionVideo from './section_video';

const CampaignsSlider = React.createClass({
	getInitialState() {
    return {
      currentSlide: 0,
      left: '0'
    }
  },

	getDefaultProps() {
		return {
			slides: []
		}
	},

	componentDidMount() {
    this.interval = setInterval(() => {
      this.nextSlide(false);
    }, 2000);
  },

	nextSlide(clear = true) {
    if(clear) clearInterval(this.interval);
 	  let total = this.props.slides.length - 1;
    let left = this.state.currentSlide < total ? this.state.currentSlide + 1 : 0;
    this.setState({left: '-' + (left * 100) + '%', currentSlide: left});
 },

  prevSlide() {
    clearInterval(this.interval);
    let total = this.props.slides.length - 1;
    let left = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0;
    this.setState({left: '-' + (left * 100) + '%', currentSlide: left});
  },

	render() {
		const { slides } = this.props;
		let viewportWidth = `${100 * slides.length}%`;
    let slideWidth = `${(100 / slides.length)}%`;
		let viewportStyle = {
      width: viewportWidth, 
      left: this.state.left, 
		};

		return (
			<div className="campaigns-slider">
			 	<div
          className="campaigns-slider__viewport" 
          style={viewportStyle}
				>
				{slides.map((slide, i) => {
					return (
						<div key={i} className="campaigns-slider__slide">
							<SectionVideo  imgUrl={slide.image} url={slide.url}  />
							<div class="campaigns-slider__slide__content" style={{background: slide.bg}}>
								<h4>{slide.title}</h4>
								<p>{slide.content}</p>
							</div>
						</div>
					)
				})}
				</div>
			</div>
		)
	}
});

export default CampaignsSlider;