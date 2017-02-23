import React from 'react';
import qs from 'qs';
import request from 'axios';
import Isotope from 'isotope-layout';

const Posts = React.createClass({
	getInitialState() {
		return {
			posts: [],
			paged: 1,
			seeMore: true
		}
	},

	componentWillMount() {
		let data = qs.stringify({ action: "get_posts"});

    request
		.post("/wp-admin/admin-ajax.php", data)
    .then(res => {
      this.setState({ posts: res.data });
    })
    .catch(err => console.error(err));
	},

	componentDidUpdate: function() {
    if(this.iso) {
				this.initIsotope();
				this.iso.reloadItems();
      } else if(this.state.posts && this.state.posts.length > 0) {
				 this.initIsotope();
			}
  },

	componentDidMount() {
		  if(this.state.posts && this.state.posts.length > 0){
        this.initIsotope();
      }
	},

	seeMore() {
		let paged = this.state.paged + 1;
		let data = qs.stringify({ action: "get_posts", paged});

    request
		.post("/wp-admin/admin-ajax.php", data)
    .then(res => {
			if(res.data.length > 0) {
				this.setState({ posts: [...this.state.posts, ...res.data], paged });
			} else {
				this.setState({seeMore: false});
			}
      
    })
    .catch(err => console.error(err));
	},

	initIsotope() {
		const grid = this.grid;

		this.iso = new Isotope( grid, {
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
	
	},

	handleImageLoaded() {
		if(this.iso) {
			this.iso.layout();
		}
	},

	goToPosts() {
		window.location = this.props.url;
	},

	render() {
		const { posts } = this.state;

		return (
			<div>
				<div ref={grid => this.grid = grid}>
					<div className="grid-sizer"></div>

					{posts.map((post, i) => {
						return (
							<div key={i} className="grid-item">
								<div className="grid-item__content">
									{post.post_image ? <img src={post.post_image} onLoad={this.handleImageLoaded} /> : ''}

									<div className="grid-item__content__texts">
										<h5><a href={post.post_permalink}>{post.post_title}</a></h5>
										<p>{ `${post.post_short}...` }</p>
									</div>
									
								</div>
							</div>
						)
					})}
				</div>
				
				<button 
					onClick={this.goToPosts} 
					style={this.state.seeMore ? {
						display: 'block', 
						margin: '30px auto', 
						background: 'transparent', 
						color: '#3C515F',
						borderColor: '#3C515F'
					} : {display: 'none'}
					}
				>
					See more
				</button>
			</div>
		)
	}
});

export default Posts;