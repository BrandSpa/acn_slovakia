import React from 'react';

const GalleryHeader = React.createClass({
	getDefaultProps() {
		return {
			images: [],
			excerpts: []
		}
	},
	
	render() {
		const { images, excerpts } = this.props;

		return (
			<div className="header-gallery">
				<div class="header-gallery__viewport">
				<div class="l-wrap">
					{images.map((image, i) =>
						<div class="header-gallery__caption" style={i == 0 ? {dispaly: 'block'} : {display: 'none'}}>
							<img src={image} alt="" style={{maxWidth: '100%'}} />
							<span class="header-gallery__caption-text">{excerpts[i]}</span>
						</div>
					)}
					</div>
				</div>
			</div>
		)	
	}
});

export default GalleryHeader;