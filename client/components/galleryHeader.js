import React from 'react';
import Radium, { StyleRoot } from 'radium';

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

	componentDidMount() {
		let nav = document.querySelector('.nav');
		nav.style.background = 'rgb(34, 34, 34)';
		let container = document.querySelector('.header-gallery__container');
		let containerH = container ? container.offsetWidth / 1.5 : 'auto';
		let images =[...this.gallery.querySelectorAll('img')];

		this.props.images.forEach(image => {
			let myImage = new Image('100%', '100%');
			myImage.src = image;
			console.log(myImage, myImage.width, myImage.naturalWidth);
			// console.log('natural width', image.naturalWidth, image.width);

			// if(image.naturalWidth > image.naturalHeight) {
			// 	image.style.maxWidth = '100%';
			// }

			// if(image.naturalWidth < image.naturalHeight){
			// 	image.style.maxWidth = '45%';
			// 	image.style.display = 'block';
			// 	image.style.margin = '0 auto';
			// }
		})
	
	},
	
	changeSection(type, e) {
		if(e) e.preventDefault();
		let section = this.state.section;
		if(type == 'next') section = this.state.section < (this.props.images.length - 1)  ? this.state.section + 1 : 0;
		if(type == 'prev') section = this.state.section > 0 ? this.state.section - 1 : 0;
		this.setState({section});
	},

	render() {
		const { images, excerpts } = this.props;
		const h = (window.innerHeight - 100);
		const w = window.innerHeight;

		const btnsStyle = {
			position: 'absolute', 
			bottom: '40px', 
			right: '40px',
			'@media(max-width: 767px)': {
				bottom: '10px', 
				right: '10px'
			} 
		};

		const btnStyle = {
			border: '1px solid #fff', 
			background: 'transparent', 
			width: '50px', 
			height: '50px', 
			borderRadius: '0', 
			padding: '0'
		};

		const linkLeft = { 
			position: 'absolute', 
			height: '100%', 
			top: '0',
			bottom: 'auto', 
			left: 0, 
			width: '50%'
		};

		const linkRight = {...linkLeft, left: 'auto', right: 0};

		const mainStyle = {
			height: `${h}px`, 
			background: '#222', 
			position: 'relative',
			overflow: 'hidden',
			'@media(max-width: 767px)': {
				margin: '0 -20px'
			} 
		};

		const viewportStyle = {
			height: `${h}px`, 
			padding: '40px', 
			// display: 'flex', 
			// justifyContent: 'center', 
			// alignItems: 'center'
		};

		const excerptStyle = {
			color: '#fff', 
			marginTop: '20px', 
			display: 'block', 
			textShadow: '2px 2px 2px #222'
		};
		
		return (
			<StyleRoot>
				<div style={mainStyle} ref={gallery => this.gallery = gallery}>
					<div style={viewportStyle}>
					<div style={{maxWidth: w}}>
						<h5 style={{color: '#fff', marginBottom: '20px'}}>{this.props.texts.gallery} <i className="ion-camera"></i></h5>
							<div
								className="gallery-header__item"
								style={{position: 'relative'}}
							>
								<img src={images[this.state.section]} style={{maxWidth: '100%'}} />
								<span style={excerptStyle}>{excerpts[this.state.section]}</span>
								<a href="#" onClick={this.changeSection.bind(null, 'prev')} style={linkLeft}></a> 
								<a href="#" onClick={this.changeSection.bind(null, 'next')} style={linkRight}></a>
							</div>
						</div>
					</div>

					<div style={btnsStyle}>
						<span style={{color: '#fff', paddingRight: '10px'}}>{ images.length } {this.props.texts.of} { this.state.section + 1 }</span>
						<button 
							onClick={this.changeSection.bind(null, 'prev')} 
							style={btnStyle}>
							<i className="ion-chevron-left"></i>
						</button>

						<button 
							onClick={this.changeSection.bind(null, 'next')} 
							style={btnStyle}>
							<i className="ion-chevron-right"></i>
						</button>
					</div>
				</div>
			</StyleRoot>
		)	
	}
});

export default GalleryHeader;