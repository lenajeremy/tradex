import React, { Component } from 'react';
import { editPost } from '../fetch';
import ThumbUp from '@material-ui/icons/ThumbUpAlt'

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
    let styles = {
      borderRadius: 10,
      boxShadow: "-2px 2px 5px gray",
      padding: 20,
      background: 'transparent'
    }
    return (
      <div className="card my-4" style = {styles}>
        <div className="card-body">
          <small>{this.props.postDetails.poster}</small>
          <p>{this.props.postDetails.content}</p>
          <h5><a href='' onClick={this.handleLike}><ThumbUp /></a>{this.props.postDetails.number_of_likes}</h5>
        </div>
      </div>
    );
  }
}

export default Post;