import React from "react";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import * as fetch from "./fetch";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreatePost, AllPosts } from "./components/CreateAndViewPosts";
import Cart from "./components/Cart";
import Store from "./components/Store";
import SearchIcon from "@material-ui/icons/Search";
import SideBar from './components/SideBar'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: { userName: "", userType: "No user logged in" },
      posts: [{ content: "Loading posts", postImage: null }],
    };
    this.handleNewPosts = this.handleNewPosts.bind(this);
    this.changePost = this.changePost.bind(this);
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  componentDidMount() {
    fetch.getAllPosts(0, (posts) => {
      console.log(posts)
      this.setState({ posts: posts.posts })
    });
    window.addEventListener("scroll", this.infiniteScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll)
  }

  changePost(id, newLikeCount) {
    this.setState(
      (prevState) =>
        (prevState.posts.find(
          (post) => post.id === id
        ).number_of_likes = newLikeCount)
    );
  }

  infiniteScroll() {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
      fetch.getAllPosts(this.state.posts.length ,(posts) => {
        this.setState({ posts: [...this.state.posts, ...posts.posts] })
      });
    }
}
  handleNewPosts(postDetails) {
    console.log(postDetails)
    console.log(postDetails)
    this.setState({ posts: [postDetails, ...this.state.posts] });
  }

  setLoggedInUser = (id) => {
    this.setState({ id: id }, () => {
      fetch.getUser(this.state.id, (data) => {
        data.status !== 200
          ? console.log("there was an error in fetching")
          : this.setState({ userDetails: data.user });
      });
    });
  };

  render() {
    return (
      <Router>
        <Header userDetails={this.state.userDetails} />
        <div className="container">
          <hr />
          <Route
            path="/" exact
            component={() => (
              <React.Fragment>
                <CreatePost
                  userDetails={this.state.userDetails}
                  getNewPost={this.handleNewPosts}
                />
                <SideBar />
                <hr />
                <AllPosts
                  user_id={this.state.id}
                  posts={this.state.posts}
                  updateParent={this.changePost}
                />
              </React.Fragment>
            )}
          />
          <div className="container mt-5">
            <Route
              path="/login"
              component={() => (
                <Login loginHandler={(id) => this.setLoggedInUser(id)} />
              )}
            />
            <Route
              path="/register"
              component={() => (
                <Register loginHandler={(id) => this.setLoggedInUser(id)} />
              )}
            />
            <Route
              path="/user/cart"
              component={() => <Cart owner_id={this.state.userDetails.id} />}
            />
            <Route
              path="/user/store"
              component={() => <Store owner_id={this.state.userDetails.id} />}
            />
          </div>
        </div>
        <SearchIcon />
      </Router>
    );
  }
}
export default App;
