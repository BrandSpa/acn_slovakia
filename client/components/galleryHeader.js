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
		const h = (window.innerHeight - 140);

		return (
			<div className="header-gallery" style={{height: `${h}px`, background: '#2C2C2C', position: 'relative'}}>
				<div className="header-gallery__viewport" style={{padding: '40px'}}>
				<div className="l-wrap">
					{images.map((image, i) =>
						<div 
							className="header-gallery__caption" 
							style={i == this.state.section ? {dispaly: 'block', position: 'relative'} : {display: 'none'}}
						>
							<img src={image} style={{maxWidth: '100%', display: 'block', margin: '0 auto'}} />
							<span className="header-gallery__caption-text">{excerpts[i]}</span>
							<a 
								href="#" 
								onClick={this.changeCaption.bind(null, 'prev')} 
								style={{ position: 'absolute', height: '100%', top: '0', bottom: 'auto', left: 0, width: '50%'}}></a>
							<a 
								href="#" 
								onClick={this.changeCaption.bind(null, 'next')} 
								style={{ position: 'absolute', height: '100%', top: '0', bottom: 'auto', right: 0, width: '50%'}}></a>
						</div>
					)}
					</div>
				</div>
				<div className="header-gallery__btns" style={{position: 'absolute', bottom: '40px', right: '40px'}}>
					<button 
						onClick={this.changeCaption.bind(null, 'prev')} 
						style={{border: '1px solid #fff', background: 'transparent'}}>
						<i className="ion-chevron-left"></i>
					</button>
					<button 
						onClick={this.changeCaption.bind(null, 'next')} 
						style={{border: '1px solid #fff', background: 'transparent'}}>
						<i className="ion-chevron-right"></i>
					</button>
				</div>
			</div>
		)	
	}
});

export default GalleryHeader;