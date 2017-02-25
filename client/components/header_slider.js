import React from "react";
import Slide from './header_slide';

const headerSlider = React.createClass({
  getInitialState() {
    return {
      currentSlide: 0,
      left: '0'
    }
  },

  getDefaultProps() {
    return {
      slides: [],
      interval: 5000
    }
  },

  componentDidMount() {
    this.interval = setInterval(() => {
      this.nextSlide(false);
    }, this.props.interval);

    window.addEventListener('load', () => {
      this.height = window.innerHeight;
      this.headerHeight = document.querySelector('.nav').offsetHeight;
    })
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
    let sliderHeight = this.height && this.headerHeight ? (this.height - this.headerHeight) : 'auto'; 
    console.log(sliderHeight, window.innerHeight);
    return (
      <div className="slider" style={{ height: sliderHeight }}>
        <div 
          className="slider__viewport" 
          style={{
            width: viewportWidth, 
            left: this.state.left, 
            height: sliderHeight
          }}>
          {slides.map((slide, i) => {
            slide = {...slide, width: slideWidth, height: sliderHeight};
            return <Slide key={i} {...slide} />  
          })}
        </div>
        <div className="slider__btns">
          <button 
            className="slider__btns__prev" 
            onClick={this.prevSlide}>
            <i className="ion-chevron-left"></i>
          </button>

          <button 
            className="slider__btns__next" 
            onClick={this.nextSlide}>
            <i className="ion-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  }
});

export default headerSlider;
