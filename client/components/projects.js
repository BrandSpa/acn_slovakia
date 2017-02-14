import React from 'react';
import ProjectsIcons from './projects_icons';

const Projects = React.createClass({

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
			'background': '#B91325',
			height: '500px'
		};

		return (
			<div className="projects">
				<ProjectsIcons />
				<div className="projects__content">
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