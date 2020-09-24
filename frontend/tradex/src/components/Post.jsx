import React, { Component } from 'react';
import { editPost } from '../fetch';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {likes: this.props.postDetails.number_of_likes, user_id: this.props.user_id}
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(event) {
    console.log(event.target)
    editPost()
  }

  render() {
    return (
      <div className="card my-2">
        <div className="card-body">
          <small>{this.props.postDetails.poster}</small>
          <p>{this.props.postDetails.content}</p>
          <a href='' onClick={this.handleLike}>like</a>
          <h5>likes {this.state.likes}</h5>
        </div>
      </div>
    );
  }
}

export default Post;