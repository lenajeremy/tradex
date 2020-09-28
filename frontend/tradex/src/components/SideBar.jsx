import React from 'react';
import { Home, PersonTwoTone, CreditCardSharp, ShoppingBasket, GroupAddTwoTone, ShopTwo } from '@material-ui/icons'
import "./SideBar.css";
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: 'explore'}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value){
    this.setState({active: value}, 
      () => console.log('the new state has been set'))
  }

  render() {
    // SideBar Styles
    return (
      <div className="sideBar">
        <div className="sidebar__main">
          <div onClick = {() => this.handleClick('explore')} className={`sidebar__links ${this.state.active === 'explore'? 'active': ''}`}>
            <div className="left">
              <div className="top"></div>
              <div className="side"></div>
              <div className="bottom"></div>
            </div>
            <Link to='/'><Home />Explore</Link>
          </div>
          <div onClick = {() => this.handleClick('profile')} className={`sidebar__links ${this.state.active === 'profile'? 'active': ''}`}>
            <div className="right">
              <div className="top"></div>
              <div className="side"></div>
              <div className="bottom"></div>
            </div>
            <Link to='/user/profile'><PersonTwoTone />Your Profile</Link>
          </div>
          <div onClick = {() => this.handleClick('account')} className={`sidebar__links ${this.state.active === 'account'? 'active': ''}`}>
            <div className="left">
              <div className="top"></div>
              <div className="side"></div>
              <div className="bottom"></div>
            </div>
            <Link to='/user/account'><CreditCardSharp />Your Account</Link>
          </div>
          <div onClick = {() => this.handleClick('cart')} className={`sidebar__links ${this.state.active === 'cart'? 'active': ''}`}>
            <div className="right">
              <div className="top"></div>
              <div className="side"></div>
              <div className="bottom"></div>
            </div>
            {this.props.userDetails.userType.toLowerCase() === 'buyer' ? <Link to='/user/cart'><ShoppingBasket />Your Cart</Link> : <Link to='/user/store'><ShopTwo />Your Products</Link>}
          </div>
          <div onClick = {() => this.handleClick('ad')} className={`sidebar__links ${this.state.active === 'ad'? 'active': ''}`}>
            <div className="left">
              <div className="top"></div>
              <div className="side"></div>
              <div className="bottom"></div>
            </div>
            <Link to='/core/ads'><GroupAddTwoTone />Advertise on TradeX</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar