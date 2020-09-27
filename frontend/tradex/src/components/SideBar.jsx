import React from 'react';
import { Home, HomeOutlined, HomeWorkOutlined, } from "@material-ui/icons";
import "./SideBar.css";
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    // SideBar Styles
    return (
      <div className="sideBar">
        <div className="sidebar__main">
          <div className="sidebar__links">
            <Link to='/user/profile'>Your Profile</Link>
          </div>
          <div className="sidebar__links">
            <Link to='/user/account'>Your Account</Link>
          </div>
          <div className="sidebar__links">
            <Link to='/user/cart'>Your Cart</Link>
          </div>
          <div className="sidebar__links">
            <Link to='/core/ads'>Advertise on TradEX</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar