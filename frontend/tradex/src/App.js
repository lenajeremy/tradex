import React from 'react';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import * as fetch from './fetch';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { getAllPosts } from './fetch';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userDetails: {userName: '', userType: 'No user logged in'},
      posts: []
    }
  }

  setLoggedInUser = (id) =>{
    this.setState({id: id}, () => {
      fetch.getUser(this.state.id, data => {
        data.status !== 200 ? console.log('there was an error in fetching') : this.setState({userDetails: data.user})
      })
    })
  }
  
  componentDidMount(){
    getAllPosts(posts => this.setState({posts: posts.posts}))
  }

  render(){
    return(
    <div className = 'container-fluid'>
      <Router>
        <Header userDetails = {this.state.userDetails}/>
        <hr/>
        <div className = 'container mt-5'>
          <Route path = '/login' component = {() => <Login loginHandler = {id => this.setLoggedInUser(id)}/>}/>
          <Route path = '/register' component = {() => <Register loginHandler = {id => this.setLoggedInUser(id)}/>}/>
        </div>
      </Router>
    </div>
    )
  }
}
export default App;
