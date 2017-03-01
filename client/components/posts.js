import React from 'react';
import qs from 'qs';
import request from 'axios';
import Minigrid from 'minigrid';
import debounce from '../lib/debounce';
import Post from './post';

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



  render() {
    const {posts} = this.state;

    const postMain = posts.map((post, i) => {
      if(i == 0) {
        return <Post key={i} type='main' post={post} />
      } 
    });

    const postsNodes = posts.map((post, i) => {
      if(i !== 0) {
        return <Post key={i} type='main' post={post} />
      } 
    });

    return (
      <div>
        <div ref={grid => this.grid = grid}>
         {postMain}
         <div className="grid-items">
          {postsNodes}
         </div>
        </div>
        <button
          style={{display: 'block'}}
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
