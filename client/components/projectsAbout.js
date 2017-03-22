import React from 'react';
import Projects from './projects';

const ProjectsAbout = React.createClass({
	render() {
		return (
			<div>
				<Projects contents={this.props.projects} donate={this.props.donate} />
				<div class="projects-about-num">
					<div class="projects-about-num__num">
						{this.props.projects[1].number}
					</div>
					<div class="projects-about-num__text">
						{this.props.projects[1].number_text}
					</div>
				</div>
			</div>
		)
	}
});

export default ProjectsAbout;