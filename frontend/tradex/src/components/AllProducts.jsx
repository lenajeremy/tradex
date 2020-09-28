import React, { Component } from 'react';
import Product from './Product';
import * as fetch from '../fetch';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = { products: []}
  }
  componentDidMount(){
    
  }
  render() { 
    return (
      <React.Fragment>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
      </React.Fragment>
    );
  }
}
 
export default AllProducts;