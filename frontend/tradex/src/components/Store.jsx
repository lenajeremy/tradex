import React, { Component } from 'react';
import * as fetch from '../fetch';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    // fetch.getStore(1, data => {
    //   console.log(data);
    // })
  }
  render() { 
    return (
      <p>Store</p>
    );
  }
}
 
export default Store;