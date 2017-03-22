import React from 'react';
import Projects from './projects';
import PostsAbout from './postsAbout';

const ProjectsAbout = React.createClass({
	getInitialState() {
		return {
			section: 0
		}
	},

	handleSection(i) {
		let section = (i - 1);
		this.setState({section});
	},

	render() {
		const { section } = this.state;

		return (
			<div>
				<Projects contents={this.props.projects} donate={this.props.donate} changeSection={this.handleSection} />
				<div class="projects-about-num">
					<div class="projects-about-num__num">
						{this.props.projects[section] ? this.props.projects[section].number : ''}
					</div>

					<div class="projects-about-num__text">
						{this.props.projects[section] ? this.props.projects[section].number_text : ''}
					</div>
				</div>
				
				<PostsAbout />
			</div>
		)
	}
});

export default ProjectsAbout;