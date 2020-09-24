import React, { Component } from 'react';
import * as fetch from '../fetch';
import InputField from './InputField';
import Post from './Post';





class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = { postContent: '', postImage: '', isError: false, errors: [], isSuccess: null }
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    let user_id = this.props.userDetails.id;
    fetch.createNewPost(user_id, this.state.postContent, this.state.postImage, data => {
      if (data.status !== 200) {
        // set the state of error to true
        this.setState({ isError: true, errors: data.errors, isSuccess: false });
      } else {
        this.props.getNewPost(data.post_details)
        this.setState({ postContent: '', postImage: '', isSuccess: true, isError: false });
      }
    })
  }

  render() {
    let displayError = this.state.isError ? <p className='text-danger text-center'>{this.state.errors[0]}</p> : '';
    let displaySuccess = this.state.isSuccess ? <p className='text-success text-center'>Your post has successfully been created</p> : '';
    return (
      <div className="newPost">
        <h4 className='text-center'>Create New Post</h4>
        <form onSubmit={this.handleFormSubmission}>
          <InputField
            type='textarea'
            name='postContent'
            placeholderMessage={`What's happening today${this.props.userDetails.username ? ` ${this.props.userDetails.username}` : ''}??`}
            changeParentState={(state, name) => this.setState({ [name]: state })}
          />
          <br />
          <label className='text-secondary'>Text ain't enough?? Add an image!</label>
          <input type='file' accept='image/*' className='form-control' onChange={e => this.setState({ postImage: e.target.value })} />
          <br />
          <button type="submit" className='btn btn-success'>Submit</button>
        </form>
        {displayError}
        {displaySuccess}
      </div>
    );
  }
}


class AllPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="posts">
        {this.props.posts.map((post, index) => <Post key={index} postDetails = {post} />)}
      </div>
    )
  }
}

export { CreatePost, AllPosts };
