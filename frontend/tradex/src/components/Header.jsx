import React from 'react';
import {Link} from 'react-router-dom';

function Header(props){
  return(
    <header>
      <nav className = 'navbar navbar-expand-sm navbar-dark bg-secondary'>
        <div className="container">
        <Link to = '/' className = 'navbar-brand'>TradEX</Link>
        <ul className="navbar-nav ml-auto">
          <li className ='nav-item'><Link to = '/' className = 'nav-link'>Home</Link></li>
          <li className ='nav-item'><Link to = '/login' className = 'nav-link'>Login</Link></li>
          <li className ='nav-item'><Link to = '/register' className = 'nav-link'>Register</Link></li>
        </ul>
        </div>
      </nav>
      <div className="bg-info p-2 d-flex justify-content-center align-items-center text-white userInfo">
        <p className = 'm-0 ml-3'>{props.userDetails.userName}</p>
        <p className = 'm-0 ml-3'>{props.userDetails.userType}</p>
      </div>
    </header>
  )
}
 
export default Header;