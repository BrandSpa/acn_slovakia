import React from 'react';

const Post = React.createClass({
	handleImageLoaded() {
  	this.props.onImageLoaded();
  },
	getDefaultProps() {
		return {
			post: {
				post_title: ''
			}
		}
	},

	render() {
		const { post, type, read_more } = this.props;
		const img = post.post_image ? <img src={post.post_image} onLoad={this.handleImageLoaded} /> : '';

		return (
			<div className={type == 'main' ? 'grid-item grid-item--main' : 'grid-item'}>
					<div className={type == 'main' ? 'grid-item__content grid-item--main__content' : 'grid-item__content'}>
						<a href={post.post_permalink}>
							{img}
						</a>
							<div
									className={
											type == 'main' ? 'grid-item__content__texts grid-item--main__content__texts' : 'grid-item__content__texts'
									}
									style={img == '' ? {width: '100%'} : {} }
							>
									<h5><a href={post.post_permalink}>{ post.post_title ? post.post_title.substring(0, 70) + '...' : ''}</a></h5>
									<p>{`${post.post_short}...`}</p>
									<a href={post.post_permalink} className="grid-item__content__texts__readmore">{read_more}...</a>
							</div>
					</div>
			</div>
		)
	}
})

export default Post;