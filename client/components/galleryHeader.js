import React from 'react';

const GalleryHeader = React.createClass({
	getInitialState() {
		return {
			section: 0
		}
	},

	getDefaultProps() {
		return {
			images: [],
			excerpts: []
		}
	},
	
	changeCaption(type, e) {
		e.preventDefault();
		let section = this.state.section;
		if(type == 'next') section = this.state.section < (this.props.images.length - 1)  ? this.state.section + 1 : 0;
		if(type == 'prev') section = this.state.section > 0 ? this.state.section - 1 : 0;
		this.setState({section});
	},

	render() {
		const { images, excerpts } = this.props;
		const h = window.innerHeight;

		return (
			<div className="header-gallery" style={{height: `${h}px`, background: '#333'}}>
				<div className="header-gallery__viewport">
				<div className="l-wrap">
					{images.map((image, i) =>
						<div className="header-gallery__caption" style={i == this.state.section ? {dispaly: 'block'} : {display: 'none'}}>
							<img src={image} alt="" style={{maxWidth: '100%', display: 'block', margin: '40px auto'}} />
							<span className="header-gallery__caption-text">{excerpts[i]}</span>
						</div>
					)}
					</div>
				</div>
				<div class="header-gallery__btns">
					<button onClick={this.changeCaption.bind(null, 'prev')}><i className="ion-chevron-left"></i></button>\
					<button onClick={this.changeCaption.bind(null, 'next')}><i className="ion-chevron-right"></i></button>
				</div>
			</div>
		)	
	}
});

export default GalleryHeader;