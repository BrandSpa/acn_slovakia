import React from 'react';
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
	9: '#e6bb2f',
};

const Projects = React.createClass({

	getInitialState() {
		return {
			bg: '#B91325'
		}
	},

	componentDidMount() {
		let left = document.querySelector('.projects__icons li:nth-child(1)').offsetLeft;
		setTimeout(() => {

		}, 1000);
		
		$('.projects__arrow').css({ left });
	},

	changeContent(num) {
		this.setState({bg: backgroundColors[num]});
		let left = document.querySelector(`.projects__icons li:nth-child(${num})`).offsetLeft;
		$('.projects__arrow').css({ left });
	},

	render() {
		let title = 'Mass stipends';
		let text = 'In many regions, the faithful are now so poor that they cannot support their priests. Mass stipends are often the only means of existential help in these regions.  Thanks to 1.2 million mass stipends, the livelihood of every ninth priest, on average, can be assured.';
		let imgUrl = 'http://acninternational.org/wp-content/uploads/2017/02/img9.jpg';

		let styleRight = {
			background: `url(${imgUrl})`,
			'backgroundSize': 'cover',
			height: '500px'
		};
		
		let styleLeft = {
			'background': this.state.bg,
			height: '500px'
		};

		return (
			<div className="projects">
				<ProjectsIcons ref="projectIcons" onChange={this.changeContent} />
				<div className="projects__content">
					<div className="projects__arrow"></div>
					<div className="col-4-l projects__content__content-left" style={styleLeft}>
						<h4>{title}</h4>
						<p>{text}</p>
						<button>DONATE</button>
					</div>
					<div className="col-8-l projects__content__content-right" style={styleRight}></div>
				</div>
			</div>
		)
	}
});

export default Projects;