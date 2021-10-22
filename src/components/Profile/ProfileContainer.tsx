import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileT } from "../../types/types";
import { AppStateT } from "../../redux/store-redux";

type MapStateToPropsT = {
  profile: ProfileT | null,
  status: string | null,
  authUserId: number | null,
  isAuth: boolean
}

type MapDispatchPropsT = {
  getProfile: (userId: number | null) => void
  getStatus: (userId: number | null) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  //TODO replace any type
  saveProfile: (updatedProfile: ProfileT) => any
}

type PathParamsT = {
  userId: string
}

type PropsT = MapStateToPropsT & MapDispatchPropsT & RouteComponentProps<PathParamsT>

class ProfileContainer extends React.Component<PropsT> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId
    if (!userId) {
      if (this.props.isAuth) {
        userId = this.props.authUserId
      }
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsT, prevState: PropsT) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    return (
      <Profile
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

const mapStateToProps = (state: AppStateT): MapStateToPropsT => ({
  profile: state.postsPage.profile,
  status: state.postsPage.status,
  authUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

const mapDispatchToProps: MapDispatchPropsT = {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsT, MapDispatchPropsT, {}, AppStateT>(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
