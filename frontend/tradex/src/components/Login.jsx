import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as fetch from '../fetch';
import InputField from './InputField';
// import {FontAwesomeIcon} from '@fortawesome/fontawesome-svg-core';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      username: '',
      password: '',
      id: null,
      errorMessage: '',
      toRedirect: false
    }
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    fetch.loginUser(this.state.username, this.state.password, data => {
      if (data.status !== 200) {
        // do some stuff eg. display an error message
        this.setState({ errorMessage: data.message })
      } else {
        this.setState({ id: data.id, errorMessage: '', toRedirect: true},
          () => this.props.loginHandler(this.state.id))
      }
    });
  }

  render() {
    let styles = {
      borderRadius: 10,
      boxShadow: "-2px 2px 5px gray",
      padding: 20
    };

    let displayError = () => {
      if (this.state.errorMessage) {
        return <p className='text-danger'>{this.state.errorMessage}</p>
      }
    }
    if (!this.state.toRedirect) {
      return (
        <div className = 'login' style={styles}>
          {/* Map through the error messages for any error and display the error*/}
          <h4 className= 'text-center mb-4'>Login</h4>
          {displayError()}
          <form onSubmit={this.handleFormSubmission}>
            <InputField inputType='text' placeholderMessage='Enter your username' name='username' changeParentState={(state, name) => this.setState({ [name]: state })} /><br />
            <InputField inputType='password' placeholderMessage='Enter your password' name='password' changeParentState={(state, name) => this.setState({ [name]: state })} />
            <br />
            <input type='submit' className='btn btn-primary btn-block' value = 'Login'/>
          </form>
        </div>
      )
    }
    return <Redirect to='/'/>
  }
}

export default Login;