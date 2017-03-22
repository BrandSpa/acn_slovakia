import React from 'react';
import Projects from './projects';

const ProjectsAbout = React.createClass({
	render() {
		console.log(this.props.projects);
		return (
			<div>
				<Projects contents={this.props.projects} donate={this.props.donate} />
				<div class="projects-about-num">
					<div class="projects-about-num__num">
						{this.props.projects[0].number}
					</div>
					<div class="projects-about-num__text">
						{this.props.projects[0].number_text}
					</div>
				</div>
			</div>
		)
	}
});

export default ProjectsAbout;