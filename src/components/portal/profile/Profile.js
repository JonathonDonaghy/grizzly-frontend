import React, { Component } from "react";
import { connect } from "react-redux";
import photoID from "../../../img/photoID.png";

class Profile extends Component {
  render() {
    return (
      <div className="text-center profile-sidebar">
        <div className="profile-header">
          <div className="profile-header-text">Profile
             <button type="button" className="btn btn-link profile-header-button">
              Edit
            </button>
          </div>
         
        </div>
        <div className="smaller-profile-box">
          <div className="profile-userpic">
            <img src={photoID} className="img-responsive" alt="" />
          </div>

          <div className="profile-usertitle">
            <div className="profile-usertitle-name">Helen Cho</div>
          </div>
          <div className="profile-usermenu">
            <div className="profile-usertitle-name">ID</div>
            <div className="profile-usertitle-job">GRZLY17234</div>
            <div className="profile-usertitle-name">Designation</div>
            <div className="profile-usertitle-job">Sr. Admin</div>
            <div className="profile-usertitle-name">Office</div>
            <div className="profile-usertitle-job">NYC, NY, USA</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Profile);
