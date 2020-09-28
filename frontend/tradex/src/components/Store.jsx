import React, { Component } from 'react';
import * as fetch from '../fetch';
import Product from './Product';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <p>Store</p>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </React.Fragment>
    );
  }
}

export default Store;