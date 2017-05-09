import React from 'react';

const Carousel = React.createClass({
	
	render() {
		return (
			<div>
				<div dangerouslySetInnerHTML={{__html: this.props.content}} />
			</div>
		)
	}
});

export default Carousel;