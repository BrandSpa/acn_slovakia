import React, { Component } from 'react';
import { css } from 'glamor';
import ProjectsIcons from './projectsIcons';

const colors = {
  1: "#b91325",
  2: "#00355f",
  3: "#6e5785",
  4: "#95a0ad",
  5: "#156734",
  6: "#689038",
  7: "#7a2d04",
  8: "#b27009",
  9: "#E4A70F"
};

class ProjectsInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			section: 1,
			projects: []
		}
	}

	handleSection = (section, e) => {
		this.setState({ section });
	};

	render() {

		let infoSectionStyle = css({
			background: colors[this.state.section],
			padding: '40px',
			textAlign: 'center',
			color: '#fff',
			display: 'flex',
			alignContent: 'center',
			alignItems: 'center'
		});

		let numTextStyle = css({
			fontSize: '60px',
			marginRight: '60px',
			'@media (max-width: 767px)': {
				margin: '0'
			}
		});

		let section = this.state.section - 1;

		return (
			<div>
				<ProjectsIcons onChange={this.handleSection} />
				<div style={infoSectionStyle}>
					<span style={ numTextStyle }>{this.props.projects[section] ? this.props.projects[section].number : ""}</span> 
					<span style={{ fontSize: '30px' }}>{this.props.projects[section] ? this.props.projects[section].number_text : ""}</span>
				</div>
			</div>
			
		)
	}
}

export default ProjectsInfo;