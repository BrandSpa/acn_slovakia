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
		console.log(this.props.category);
		let data = qs.stringify({action: 'get_posts'});

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
				return <h3>{post.title}</h3>
			})}
			</div>
		)
	}
});

export default PostsAbout;