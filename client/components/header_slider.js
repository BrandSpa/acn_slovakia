import React from 'react';
import Slide from './header_slide';

const headerSlider = React.createClass({
  getInitialState() {
    return {currentSlide: 0, left: '0'};
  },
  
  getDefaultProps() {
    return {slides: [], interval: 5000, anchor: '#'};
  },

  componentDidMount() {
    this.interval = setInterval(
      () => {
        this.nextSlide(false);
      },
      this.props.interval
    );
  },

  nextSlide(clear = true) {
    if (clear) clearInterval(this.interval);
    let total = this.props.slides.length - 1;
    let left = this.state.currentSlide < total
      ? this.state.currentSlide + 1
      : 0;
    this.setState({left: '-' + left * 100 + '%', currentSlide: left});
  },

  prevSlide() {
    clearInterval(this.interval);
    let total = this.props.slides.length - 1;
    let left = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0;
    this.setState({left: '-' + left * 100 + '%', currentSlide: left});
  },

  render() {
    const {slides} = this.props;
    let viewportWidth = `${100 * slides.length}%`;
    let slideWidth = `${100 / slides.length}%`;
    let windowHeight = window.innerHeight;
    let headerBannerHeight = document.querySelector('.header-banner') 
      ?  document.querySelector('.header-banner').offsetHeight
      : 0;
    let navHeight = document.querySelector('.nav')
      ? document.querySelector('.nav').offsetHeight
      : 0;
    let sliderHeight = windowHeight && navHeight && headerBannerHeight
      ? windowHeight - navHeight - headerBannerHeight
      : 'auto';

    let viewportStyle = {
      width: viewportWidth,
      left: this.state.left,
      height: sliderHeight
    };

    return (
      <div className="slider" style={{height: sliderHeight}}>
        <div
          className="slider__viewport"
          style={viewportStyle}
        >
          {slides.map((slide, i) => {
            slide = {...slide, width: slideWidth, height: sliderHeight};
            return <Slide key={i} {...slide} {...this.props} />;
          })}
        </div>
        {slides.length > 1 ? 
        <div className="slider__btns">
          <button className="slider__btns__prev" onClick={this.prevSlide}>
            <i className="ion-chevron-left" />
          </button>
          <button className="slider__btns__next" onClick={this.nextSlide}>
            <i className="ion-chevron-right" />
          </button>
        </div>
        : ''}
      </div>
    );
  }
});

export default headerSlider;
