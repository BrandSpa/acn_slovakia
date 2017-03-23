import React from 'react';
import Projects from './projects';
import PostsAbout from './postsAbout';
const backgroundColors = {
  1: '#b91325',
  2: '#00355f',
  3: '#6e5785',
  4: '#95a0ad',
  5: '#156734',
  6: '#689038',
  7: '#7a2d04',
  8: '#b27009',
  9: '#E4A70F'
};

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
					<div class="projects-about-num__num" style={{width: '50%', float: 'left', height: '100px'}}>
						{this.props.projects[section] ? this.props.projects[section].number : ''}
					</div>

					<div class="projects-about-num__text" style={{width: '50%', float: 'left', height: '100px'}}>
						{this.props.projects[section] ? this.props.projects[section].number_text : ''}
					</div>
				</div>

				<PostsAbout category={this.props.projects[section] ? this.props.projects[section].post_category : ''} />
			</div>
		)
	}
});

export default ProjectsAbout;