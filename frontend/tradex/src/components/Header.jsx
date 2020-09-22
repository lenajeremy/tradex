import React, { Component } from 'react';

function Header(props){
  return(
    <header>
      <nav>
        <a href="" className="logo">Logo</a>
        <a href="" className="btn">Login</a>
        <a href="" className="btn">Register</a>
      </nav>
      <div className="userInfo">
        <p>{props.username}</p>
        <p>{props.userType}</p>
      </div>
    </header>
  )
}
 
export default Header;