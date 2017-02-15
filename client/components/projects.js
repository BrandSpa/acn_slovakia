import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsIcons from './projects_icons';
const backgroundColors = {
	1: '#b91325',
	2: '#00355f',
	3: '#6e5785',
	4: '#95a0ad',
	5: '#156734',
	6: '#689038',
	7: '#7a2d04',
	8: '#b27009',
	9: '#E4A70F',
};

const Projects = React.createClass({

	getInitialState() {
		return {
			section: 1,
			bg: '#B91325',
			donateColor: '#B91325'
		}
	},

	componentDidMount() {

		setTimeout(() => {
			let left = this.el.querySelector(`.projects__icons li:nth-child(${1})`).offsetLeft;
			this.el.querySelector('.projects__arrow').style.left = `${left}px`;
		}, 1000);
	
	},

	changeContent(num) {
		let color = backgroundColors[num];
		this.setState({bg: color, donateColor: color, section: num});

		let left = this.el.querySelector(`.projects__icons li:nth-child(${num})`).offsetLeft;
		this.el.querySelector('.projects__arrow').style.left = `${left}px`;
	},

	render() {
		let { contents = [] } = this.props;
		let content = contents[this.state.section - 1] || {};
		let title = content.title;
		let text = content.content;
		let imgUrl = content.imgUrl;

		let styleRight = {
			background: `url(${imgUrl})`,
			backgroundSize: 'cover',
			minHeight: '500px'
		};
		
		let styleLeft = {
			background: this.state.bg,
			minHeight: '500px'
		};

		return (
			<div className="projects" ref={el => this.el = el}>
				<ProjectsIcons ref="projectIcons" onChange={this.changeContent} />
				<div className="projects__content">
					<div className="projects__arrow"></div>
					<div className="col-4-l projects__content__content-left" style={styleLeft}>
						<h4>{title}</h4>
						<div class="projects__content__content-left__text" dangerouslySetInnerHTML={{__html: text}} />
						<button style={{background: '#fff', borderColor: '#fff', color: this.state.donateColor}}>DONATE</button>
					</div>
					<div className="col-8-l projects__content__content-right" style={styleRight}></div>
				</div>
			</div>
		)
	}
});

export default Projects;