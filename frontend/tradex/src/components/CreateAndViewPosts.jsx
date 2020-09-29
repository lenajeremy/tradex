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
    let formData = new FormData();
    formData.append('image__file', this.state.postImage)
    console.log(event.target.elements.post_image.files[0])
    if(this.state.postContent === ''){
      this.setState({errors: ['Please add something and try again!'], isError: true, isSuccess: false});
    }else{
      fetch.createNewPost(user_id, this.state.postContent, formData, data => {
        if (data.status !== 200) {
          // set the state of error to true
          this.setState({ isError: true, errors: data.errors, isSuccess: false });
        } else {
          this.props.getNewPost(data.post_details)
          this.setState({ postContent: '', postImage: '', isSuccess: true, isError: false });
        }
      })
    }
  }

  render() {
    let styles = {
      borderRadius: 10,
      boxShadow: "-2px 2px 5px gray",
      padding: 20
    }
    let displayError = this.state.isError ? <p className='text-danger text-center'>{this.state.errors[0]}</p> : '';
    let displaySuccess = this.state.isSuccess ? <p className='text-success text-center'>Your post has successfully been created</p> : '';
    return (
      <div className="newPost" style ={styles}>
        <h4 className='text-center'>Create New Post</h4>
        <form onSubmit={this.handleFormSubmission}>
          <InputField
            type='textarea'
            name='postContent'
            placeholderMessage={`What's happening today${this.props.userDetails.firstName ? ` ${this.props.userDetails.firstName}` : ''}??`}
            changeParentState={(state, name) => this.setState({ [name]: state })}
          />
          <br />
          <label className='text-secondary'>Text ain't enough?? Add an image!</label>
          <input name = 'post_image' type='file' accept='image/*' className='form-control' onChange={e => this.setState({ postImage: e.target.files[0] })} />
          <br />
          <button type="submit" className='btn btn-success btn-block'>Post</button>
        </form>
        {displayError}
        {displaySuccess}
      </div>
    );
  }
}


class AllPosts extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {posts: this.props.posts}
    this.updatePost = this.updatePost.bind(this)
  }
  componentDidMount(){
    window.addEventListener("scroll", this.props.makeInfiniteScroll);
  }
 componentWillUnmount() {
  window.removeEventListener("scroll", this.props.makeInfiniteScroll);
 }
  updatePost(id, numberofLikes){
    this.props.updateParent(id, numberofLikes);
  }
  render() {
    return (
      <div className="posts">
        {this.state.posts.map((post, index) => 
        <Post 
          user_id = {this.props.user_id} 
          key={index} postDetails={post} 
          postLike ={this.updatePost}
        />)}
      </div>
    )
  }
}

export { CreatePost, AllPosts };
