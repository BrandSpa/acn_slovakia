import React from 'react';
import VideoModal from './videoModal';

const SectionVideoContent = React.createClass({
  getDefaultProps() {
    return {
      imgUrl: '',
      url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
      imageStyle: {},
			content: ''
    };
  },

  showVideo(e) {
    e.preventDefault();
    this.modal.show();
  },

  render() {
    let linkStyle = {float: 'left', lineHeight: '0'};
    let imageStyle = {width: '100px', margin: '0 auto'};
    imageStyle = {...imageStyle, ...this.props.imageStyle};

    return (
      <div>
        <VideoModal ref={modal => this.modal = modal} url={this.props.url} />
        <a href="#" className="image-video__link" style={linkStyle} onClick={this.showVideo}>
          <img style={imageStyle} src={this.props.imgUrl} alt="" />
					<div dangerouslySetInnerHTML={{__html: this.props.content}} />
        </a>
      </div>
    );
  }
});

export default SectionVideoContent;
