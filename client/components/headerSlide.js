import React from 'react';
import VideoModal from './videoModal';

const headerSlide = React.createClass({
  handleLink(e) {
    e.preventDefault();
    if (this.props.is_video) return this.modal.show();
    window.location.href = this.props.url;
  },
  
  render() {
    const {image, title, subtitle, url, width, height} = this.props;

    let bg = `url(${image})`;

    let style = {
      backgroundImage: bg,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer',
      width,
      height
    };

    return (
      <div>
        {
          this.props.is_video
            ? <VideoModal
              ref={modal => this.modal = modal}
              url={this.props.url}
            />
            : ''
        }
        <div className="slider__slide" style={style} onClick={this.handleLink}></div>
          <div className="slider__slide__content col-6-l col-12-m">
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
            <a href={this.props.anchor} className="slider__slide__anchor">

              <svg width="20px" height="27px" viewBox="178 602 20 27" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                      <polyline id="path-1" points="16.9743561 9.37612525 16.9743561 23.0775777 2.91233907 23.0775777"></polyline>
                      <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="14.062017" height="13.7014524" fill="white">
                          <use xlinkHref="#path-1"></use>
                      </mask>
                      <polyline id="path-3" points="16.9743561 3.23766371 16.9743561 16.9391162 2.91233907 16.9391162"></polyline>
                      <mask id="mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="14.062017" height="13.7014524" fill="white">
                          <use xlinkHref="#path-3"></use>
                      </mask>
                  </defs>
                  <g id="Group-12" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(178.000000, 602.000000)">
                      <use id="Rectangle" stroke="#F1364E" mask="url(#mask-2)" strokeWidth="4" transform="translate(9.943348, 16.226851) rotate(-315.000000) translate(-9.943348, -16.226851) " xlinkHref="#path-1"></use>
                      <use id="Rectangle-Copy" stroke="#F1364E" mask="url(#mask-4)" strokeWidth="4" transform="translate(9.943348, 10.088390) rotate(-315.000000) translate(-9.943348, -10.088390) " xlinkHref="#path-3"></use>
                  </g>
              </svg>
            </a>
          </div>
      </div>
    );
  }
});

export default headerSlide;
