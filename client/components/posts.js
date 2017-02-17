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

	componentDidUpdate: function(){
    if(this.state.posts && this.state.posts.length > 0){
        this.initIsotope();
      }
  },

	componentDidMount() {
		  if(this.state.posts && this.state.posts.length > 0){
        this.initIsotope();
      }
	},

	initIsotope() {
		const grid = this.grid;

		const iso = new Isotope( grid, {
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
	},

	render() {
		const { posts } = this.state;
		
		return (
			<div ref={grid => this.grid = grid}>
				<div className="grid-sizer"></div>

				{posts.map((post, i) => {
					return (
						<div key={i} className="grid-item">
							<div className="grid-item__content">
								{post.post_image ? <div style={{background: `url(${post.post_image})`, backgroundSize: 'cover', width: '100%', height: '150px'}}></div> : ''}
								<div className="grid-item__content__texts">
									<h5><a href={post.guid}>{post.post_title}</a></h5>
									<p>{ `${post.post_short}...` }</p>
								</div>
							</div>
						</div>
					)
				})}
				
			</div>
		)
	}
});

export default Posts;