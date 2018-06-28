import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../actions/userActions';

class UserProfile extends Component {
  render() {
    return (
      <div className="m-3 text-left col">
        <div className="m-2 row">
          <div className="col-2">
            <img
              src={this.props.user.googleProfile.picture}
              className="main-profile-img"
              alt="Profile"
            />
          </div>
          <div className="col-10 text-left">
            <div className="mb-2 row fnt-weight-600 title-size-1-5em">
              {this.props.user.googleProfile.name}
            </div>
            <div className="mb-2 row fnt-weight-400 title-size-1em">
              {this.props.user.googleProfile.email}
            </div>
            <div className="mb-2 row">
              <button
                className="btn btn-sm hover-w-b"
                onClick={() => {
                  this.props.onShowProfileForm();
                }}
              >
                <i className="fas fa-user-circle text-info mr-1" />Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserProfile);