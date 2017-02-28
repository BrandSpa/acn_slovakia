import React from 'react';
import qs from 'qs';
import request from 'axios';
import Minigrid from 'minigrid';
import debounce from '../lib/debounce';

const Posts = React.createClass({
  getInitialState() {
    return {posts: [], paged: 1, seeMore: true};
  },
  componentWillMount() {
    let data = qs.stringify({action: 'get_posts'});

    request
      .post('/wp-admin/admin-ajax.php', data)
      .then(res => {
        this.setState({posts: res.data});
      })
      .catch(err => console.error(err));
  },
  componentDidUpdate: function() {
    this.initGrid();
  },
  componentDidMount() {
    window.addEventListener('resize', debounce(this.initGrid, 300));
    this.initGrid();
  },

  initGrid() {
    if (this.state.posts && this.state.posts.length > 0) {
      let container = this.grid;
      var grid = new Minigrid({container, item: '.grid-item'});

      grid.mount();
    }
  },

  handleImageLoaded() {
  	this.initGrid();
  },

  goToPosts() {
    window.location = this.props.url;
  },
  render() {
    const {posts} = this.state;


    return (
      <div>
        <div ref={grid => this.grid = grid}>
          {posts.map((post, i) => {
            return (
              <div
                key={i}
                className={i == 0 ? 'grid-item grid-item--main' : 'grid-item'}
              >
                <div
                  className={
                    i == 0
                      ? 'grid-item__content grid-item--main__content'
                      : 'grid-item__content'
                  }
                >
                  {
                    post.post_image
                      ? <img
                        src={post.post_image}
                        onLoad={this.handleImageLoaded}
                      />
                      : ''
                  }
                  <div
                    className={
                      i == 0
                        ? 'grid-item__content__texts grid-item--main__content__texts'
                        : 'grid-item__content__texts'
                    }
                  >
                    <h5><a href={post.post_permalink}>{post.post_title}</a></h5>
                    <p>{`${post.post_short}...`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={this.goToPosts}
          className={this.state.seeMore ? 'bs-see-more' : 'hidden'}
        >
          See more
        </button>
      </div>
    );
  }
});

export default Posts;
