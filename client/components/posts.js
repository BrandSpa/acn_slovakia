import React from 'react';
import qs from 'qs';
import request from 'axios';
import Isotope from 'isotope-layout';

const Posts = React.createClass({
	getInitialState() {
		return {
			posts: []
		}
	},

	componentWillMount() {
		let data = qs.stringify({ action: "get_posts"});

    request.post("/wp-admin/admin-ajax.php", data)
    .then(res => {
      this.setState({ posts: res.data });
    })
    .catch(err => console.error(err));
	},

	componentDidMount() {
		const grid = this.grid;
		const iso = new Isotope( grid, {
			// options...
			itemSelector: '.grid-item',
			masonry: {
				columnWidth: 200
			}
		});
	},

	render() {
		const { posts } = this.state;

		return (
			<div ref={grid => this.grid = grid}>
				{posts.map((post, i) => {
					return (
						<div key={i} className="grid-item">
							<h5>{post.post_title}</h5>
							<p>{post.post_content}</p>
						</div>
					)
				})}
			</div>
		)
	}
});

export default Posts;