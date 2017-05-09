import React from 'react';
import VideoModal from './videoModal';
import Radium, { StyleRoot } from "radium";
const SectionVideoContent = React.createClass({
  getDefaultProps() {
    return {
      imgUrl: '',
      url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
      imageStyle: {},
			content: '',
      fullHeight: false
    };
  },

  showVideo(e) {
    e.preventDefault();
    this.modal.show();
  },

  render() {
    const h = window.innerHeight - 100;

    let linkStyle = {
			float: 'left', 
			lineHeight: '0',
			background: `url(${this.props.imgUrl})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			width: '100%',
			height: this.props.fullHeight ?  h : '900px',
			'@media (max-width: 767px)': {
				height: 'auto'
			}
		};

    let imageStyle = {width: '100px', margin: '0 auto'};
    imageStyle = {...imageStyle, ...this.props.imageStyle};

    return (
      <StyleRoot>
        <VideoModal ref={modal => this.modal = modal} url={this.props.url} />
        <a href="#" className="image-video__link" style={linkStyle} onClick={this.showVideo}>
					<div dangerouslySetInnerHTML={{__html: this.props.content}} />
        </a>
      </StyleRoot>
    );
  }
});

export default SectionVideoContent;
