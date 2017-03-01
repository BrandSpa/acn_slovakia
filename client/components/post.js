import React from 'react';

const Post = React.createClass({
	handleImageLoaded() {
  	this.initGrid();
  },

  goToPosts() {
    window.location = this.props.url;
  },

	render() {
		const { post, type } = this.props;

		return (
			<div className={type == 'main' ? 'grid-item grid-item--main' : 'grid-item'}>
					<div className={type == 'main' ? 'grid-item__content grid-item--main__content' : 'grid-item__content'}>
							{post.post_image ? <img src={post.post_image} onLoad={this.handleImageLoaded} /> : ''}
							<div
									className={
											type == 'main' ? 'grid-item__content__texts grid-item--main__content__texts' : 'grid-item__content__texts'
									}
							>
									<h5><a href={post.post_permalink}>{post.post_title}</a></h5>
									<p>{`${post.post_short}...`}</p>
							</div>
					</div>
			</div>
		)
	}
})

export default Post;