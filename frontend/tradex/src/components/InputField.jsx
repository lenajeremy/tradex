import React, { Component } from 'react';
import { getAllPosts } from '../fetch';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }
  }
  handleChange = (e) => {
    e.target.type === 'radio' ? this.setState({ value: this.props.value },
      () => this.props.changeParentState(this.state.value, this.props.name)) :
      this.setState({ value: e.target.value },
        () => this.props.changeParentState(this.state.value, this.props.name))
  }

  render() {
    if (this.props.type === 'textarea') {
      return(
        <textarea
          className = 'form-control'
          value = {this.state.value}
          name = {this.props.name}
          onChange = {this.handleChange}
          placeholder = {this.props.placeholderMessage}
          rows='3'
        />
      )
    }
    return (
      <input
        className={this.props.inputType !== 'radio' ? 'form-control p-4' : 'form-check-input p-2'}
        type={this.props.inputType}
        value={this.state.value}
        name={this.props.name}
        onChange={this.handleChange}
        placeholder={this.props.placeholderMessage}
      />
    );
  }
}

export default InputField;