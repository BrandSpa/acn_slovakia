import React from 'react';
import SectionVideo from './sectionVideo';

const CampaignsSlider = React.createClass({
  getInitialState() {
    return {currentSlide: 0, left: '0'};
  },

  getDefaultProps() {
    return {slides: [], interval: 0};
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
    let viewportStyle = {width: viewportWidth, left: this.state.left};
 
    return (
      <div className="campaigns-slider">
        <div className="campaigns-slider__viewport" style={viewportStyle}>
          {slides.map((slide, i) => {
            return (
              <div
                key={i}
                className="campaigns-slider__slide"
                style={{width: slideWidth}}
              >
                <SectionVideo
                  imgUrl={slide.image}
                  url={slide.url}
                  imageStyle={{width: '100%'}}
                />
                <div
                  className="campaigns-slider__slide__content"
                  style={{background: slide.bg}}
                >
                  <h4><a href={slide.url ? slide.url : '#'}>{slide.title}</a></h4>
                  <p>{slide.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="campaigns-slider__btns">
          <button className="campaigns-slider__btns__prev" onClick={this.prevSlide}>
            <i className="ion-chevron-left" />
          </button>
          <button className="campaigns-slider__btns__next" onClick={this.nextSlide}>
            <i className="ion-chevron-right" />
          </button>
        </div>
      </div>
    );
  }
});

export default CampaignsSlider;
