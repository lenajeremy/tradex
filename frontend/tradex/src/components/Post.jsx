import React, { Component } from 'react';
import { editPost } from '../fetch';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { user_id: this.props.user_id, postDetails: this.props.postDetails}
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(event) {
    event.preventDefault();
    if (this.state.user_id) {
      editPost(this.state.user_id, this.props.postDetails.id, 'like', null, data => {
        if (data.status === 200) {
          this.props.postLike(this.props.postDetails.id, data.newLikeCount)
          // new stuff
        } else {
          // another stuff
        }
      })
    } else {
      console.log('you have to login, my brother');
    }
  }

  render() {
    return (
      <div className="card my-2">
        <div className="card-body">
          <small>{this.props.postDetails.poster}</small>
          <p>{this.props.postDetails.content}</p>
          <a href='' onClick={this.handleLike}>like</a>
          <h5>likes {this.props.postDetails.number_of_likes}</h5>
        </div>
      </div>
    );
  }
}

export default Post;