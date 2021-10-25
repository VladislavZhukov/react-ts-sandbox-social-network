//CORE
import React, { ComponentType } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
//COMPONENT
import Friends from "./Friends"
//TYPES
import { FriendT } from "../../types/types"
import { AppStateT } from "../../redux/store-redux"
//SELECTORS
import {
  getAllFriendsData,
  getCurrentPage,
  getFollowingInProgress,
  getFriendsFilter,
  getIsFetching,
  getPageSize,
  getTotalFriendsCount,
} from "../../redux/friends-selectors"
//HOC
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
//REDUCER
import { follow, unfollow, getFriends, FilterSearchT } from "../../redux/friends-reducer"
//my libs
import Preloader from "../Common/Preloader/Preloader"

class FriendsContainer extends React.Component<PropsT> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props
    this.props.getFriends(currentPage, pageSize, filter)
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props
    this.props.getFriends(pageNumber, pageSize, filter)
  }

  onFilterChanged = (filter: FilterSearchT) => {
    const { pageSize } = this.props
    this.props.getFriends(1, pageSize, filter)
  }

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Friends
          totalFriendsCount={this.props.totalFriendsCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          friendsData={this.props.friendsData}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
        />
      </>
    )
  }
}

const mapStateToProps = (state: AppStateT): MapStatePropsT => {
  return {
    friendsData: getAllFriendsData(state),
    pageSize: getPageSize(state),
    totalFriendsCount: getTotalFriendsCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getFriendsFilter(state)
  }
}

const mapDispatchToProps: MapDispatchPropsT = {
  follow,
  unfollow,
  getFriends
}

export default compose<ComponentType<OwnPropsT>>(
  connect<MapStatePropsT, MapDispatchPropsT, OwnPropsT, AppStateT>(
    mapStateToProps,
    mapDispatchToProps),
  withAuthRedirect
)(FriendsContainer)

type MapStatePropsT = {
  pageSize: number
  currentPage: number
  isFetching: boolean
  friendsData: Array<FriendT>
  totalFriendsCount: number
  followingInProgress: Array<number>
  filter: FilterSearchT
}
type MapDispatchPropsT = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getFriends: (currentPage: number, pageSize: number, filter: FilterSearchT) => void
}
type OwnPropsT = {
  pageTitle: string
}
type PropsT = MapStatePropsT & MapDispatchPropsT & OwnPropsT
