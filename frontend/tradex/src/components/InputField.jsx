import React, { Component } from 'react';
import { getAllPosts } from '../fetch';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }
  }
  handleChange = (e) => {
    e.target.type === 'radio' ? this.setState({value: this.props.value},
      () => this.props.changeParentState(this.state.value, this.props.name)) : 
        this.setState({ value: e.target.value },
      () => this.props.changeParentState(this.state.value, this.props.name))
      
        
  }

  render() {
    return (
      <React.Fragment>
        <input 
          className = {this.props.inputType !== 'radio' ? 'form-control p-4' : 'form-check-input p-2'} 
          type={this.props.inputType} 
          value={this.state.value} 
          name = {this.props.name} 
          onChange={this.handleChange} 
          placeholder={this.props.placeholderMessage} 
        />
      </React.Fragment>
    );
  }
}

export default InputField;