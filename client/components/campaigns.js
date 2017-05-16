import React from 'react';

class Campaigns extends React.Component {
  static defaultProps = {
      slides: []
  };

  render() {
      const { slides } = this.props;

      return (
          <div className="bs-campaigns">
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
      )
  }
}

export default Campaigns;