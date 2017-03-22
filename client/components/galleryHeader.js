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
		let container = document.querySelector('.header-gallery__container');
		let containerH = container.offsetWidth / 1.5;
		let images =[...document.querySelectorAll('.header-gallery__caption-image')];

		images.forEach(image => {
			image.style.height = `${Math.round(containerH)}px`;
		})
		
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

		const mainStyle = {height: `${h}px`, background: '#2C2C2C', position: 'relative'};

		const viewportStyle = {
			height: `${h}px`, 
			padding: '40px', 
			display: 'flex', 
			justifyContent: 'center', 
			alignItems: 'center'
		};

		return (
			<StyleRoot>
			<div className="header-gallery" style={mainStyle}>
				<div className="header-gallery__viewport" style={viewportStyle}>
				<div className="header-gallery__container" style={{ maxWidth: '700px',  marginLeft: 'auto', marginRight: 'auto' }}>
					{images.map((image, i) =>
						<div
							className="header-gallery__caption" 
							style={i == this.state.section ? {opacity: 'block', position: 'relative'} : {display: 'none'}}
						>
							<span
								className="header-gallery__caption-image" 
								style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', display: 'block'}}
							>
							</span>
							<span className="header-gallery__caption-text" style={{color: '#fff', marginTop: '20px', display: 'block'}}>{excerpts[i]}</span>
							<a 
								href="#" 
								onClick={this.changeCaption.bind(null, 'prev')} 
								style={linkLeft}></a>
							<a 
								href="#" 
								onClick={this.changeCaption.bind(null, 'next')} 
								style={linkRight}></a>
						</div>
					)}
					</div>
				</div>

				<div className="header-gallery__btns" style={btnsStyle}>
					<button 
						onClick={this.changeCaption.bind(null, 'prev')} 
						style={btnStyle}>
						<i className="ion-chevron-left"></i>
					</button>

					<button 
						onClick={this.changeCaption.bind(null, 'next')} 
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