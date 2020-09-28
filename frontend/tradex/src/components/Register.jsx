import React, { Component } from 'react';
import InputField from './InputField';
import { registerUser } from '../fetch';
import { Redirect } from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      userType: '',
      email: '',
      conf_password: '',
      errorMessages: []
    }
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    registerUser(this.state.userName, this.state.firstName,
      this.state.lastName, this.state.userType, this.state.password,
      this.state.email, this.state.paypalEmail, this.state.conf_password, data => {
        if (data.status !== 200) {
          // do some stuff eg. display an error message
          this.setState({ errorMessages: data.errors })
        } else {
          this.setState({ id: data.id, errorMessages: [] },
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

    let displayError = this.state.errorMessages.map((message, index) => <p key={index} className='text-danger small text-center'>{message}</p>)
    if (this.state.id) {
      return <Redirect to='/' />
    }
    return (
      <div className='register' style ={styles}>
        {/* Map through the error messages for any error and display the error*/}
        <h4 className='text-center'>Create an Account</h4>
        {displayError}

        <form onSubmit={this.handleFormSubmission}>
          <div className="row">
            <div className="col-md-6">
              <InputField inputType='text' placeholderMessage='First name' name='firstName' changeParentState={(state, name) => this.setState({ [name]: state })} /><br />
            </div>
            <div className="col-md-6">
              <InputField inputType='text' placeholderMessage='Last name' name='lastName' changeParentState={(state, name) => this.setState({ [name]: state })} /><br />
            </div>
          </div>
          <InputField inputType='text' placeholderMessage='Choose a username' name='userName' changeParentState={(state, name) => this.setState({ [name]: state })} />

          <div className="row my-2">
            <div className="col-6 text-center">
            <InputField inputType='radio' name='userType' value='seller' changeParentState={(state, name) => this.setState({ [name]: state })} />
            <label>I'm a seller</label><br />
            </div>
            <div className="col-6 text-center">
            <InputField inputType='radio' name='userType' value='buyer' changeParentState={(state, name) => this.setState({ [name]: state })} />
            <label>I'm a buyer</label><br />
            </div>
          </div>

          <InputField inputType='email' placeholderMessage='Enter your email' name='email' changeParentState={(state, name) => this.setState({ [name]: state })} />

          <InputField inputType='email' placeholderMessage='Enter your paypal email' name='paypalEmail' changeParentState={(state, name) => this.setState({ [name]: state })} />

          <InputField inputType='password' placeholderMessage='Enter your password' name='password' changeParentState={(state, name) => this.setState({ [name]: state })} />

          <InputField inputType='password' placeholderMessage='Confirm your password' name='conf_password' changeParentState={(state, name) => this.setState({ [name]: state })} />
          <br />
          <input type='submit' className='btn btn-primary btn-block' value = 'Register'/>
        </form>
      </div>
    );
  }
}

export default Register;