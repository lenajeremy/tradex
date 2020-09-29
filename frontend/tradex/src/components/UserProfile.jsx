import React, { Component } from 'react';
import { PersonTwoTone, CameraAltTwoTone } from '@material-ui/icons'
import './UserProfile.css';

function ProfileImage({ image, userName }) {
  return (
    <div className="profile__image img-responsive img-fluid">
      <img src={`${image}`} alt={userName} />
    </div>
  )
}
function ProfileSVG(){
  return(
    <div className="profile__image">
      <PersonTwoTone className = 'user__svg' />
    </div>
  )
}

class UserProfile extends Component {
  state = {}

  componentDidMount() {
    console.log(this.props)
  }
  editProfileUrl = (url)=>{
    return `http://localhost:8000/media/${url}`
  }
  render() {
    return (
      <React.Fragment>
        <div className="profile">
          <div className="top">
            {this.props.userDetails.profilePicture ? <ProfileImage userName = {this.props.userDetails.userName} image={this.editProfileUrl(this.props.userDetails.profilePicture)} /> : <ProfileSVG />}
            <div className="details">
            <h4>{this.props.userDetails.userName}</h4>
            <h5>{this.props.userDetails.profile.status}</h5>
            </div>
          </div>
          <p>{this.props.userDetails.profile.bio}</p>
        </div>
      </React.Fragment>
    );
  }
}
// window.open(`https://twitter.com/intent/tweet?text=Thank%20you%20@theabbiee%20for%20writing%20this%20helpful%20article%2e%0A%0AEverything%20You%20Need%20to%20Know%20About%20Cookies%20for%20Web%20Development%0A%0Ahttps%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Feverything-you-need-to-know-about-cookies%2F`, 'share-twitter', 'width=550, height=235'); return false;
export default UserProfile;