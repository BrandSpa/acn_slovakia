import React, { Component } from "react";

class sectionDonate extends Component {

	render() {
		const { content } = this.props;

 		return (
			<div class="row">
				<div className="col-3" style={ { background: "RGBA(43, 58, 68, .9)" } }>
					{content}
				</div>
				<div className="col-9" style={{ background: "#fff" }}>
					
				</div>
			</div>
		)
	}
}