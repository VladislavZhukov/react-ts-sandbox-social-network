import React from "react";
import Profile from "./Profile.jsx";
import { connect } from "react-redux";
import {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { compose } from "redux";

// type MapStateToPropsT = {
//   profile: ProfileType | null
//   status: string | null
//   authUserId: number | null
//   isAuth: boolean
// }

// type mapDispatchToPropsT = {
//   getProfile: (userId: number) => void
//   getStatus: (userId: number) => void
//   updateStatus: (status: string) => void
//   savePhoto: (file: any) => void
//   saveProfile: (updatedProfile: ProfileType) => void
// }

// type PropsT = MapStateToPropsT & mapDispatchToPropsT

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      if (this.props.isAuth) {
        userId = this.props.authUserId;
      }
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.postsPage.profile,
  status: state.postsPage.status,
  authUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});
const mapDispatchToProps = {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
