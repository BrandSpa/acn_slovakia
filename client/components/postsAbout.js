import React from 'react';
import request from 'axios';
import qs from 'qs';
const endpoint = '/wp-admin/admin-ajax.php';

const PostsAbout = React.createClass({
	getInitialState() {
		return {
			posts: []
		}
	},
	
	componentWillReceiveProps() {
		this.fetchPosts();
	},

	componentDidMount() {
		this.fetchPosts();
	},

	fetchPosts() {
		let data = qs.stringify({action: 'get_posts', 'post_perpage': 4, 'post_category': this.props.category});

		request.post(endpoint, data)
		.then(res => {
        this.setState({posts: res.data});
      })
      .catch(err => console.error(err));
	},

	render() {
		const { posts } = this.state;
		return (
			<div>
			{posts.map((post, i) => {
				return (
					<div key={i} className="col-3">
						<img src={post.post_image} alt="" />
						<h3>{post.post_title}</h3>
					</div>
					)
			})}
			</div>
		)
	}
});

export default PostsAbout;