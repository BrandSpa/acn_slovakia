import React from 'react';
import Projects from './projects';

const ProjectsAbout = React.createClass({
	render() {
		return (
			<Projects contents={this.props.projects} />
		)
	}
});

export default ProjectsAbout;