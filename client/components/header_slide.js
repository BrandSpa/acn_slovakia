import React from 'react';
import VideoModal from './video_modal';

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
        <div className="slider__slide" style={style} onClick={this.handleLink}>
          <div className="slider__slide__content">
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
          </div>
        </div>
      </div>
    );
  }
});

export default headerSlide;
