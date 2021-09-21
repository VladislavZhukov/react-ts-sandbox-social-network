//CORE
import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
//TYPES
import { BestFriendsT } from "../../types/types"
import { AppStateT } from "../../redux/store-redux"
//COMPONENTS
import NavBar from "./NavBar"

type MapStateToPropsT = {
  friends: Array<BestFriendsT>
}

class NavBarContainer extends React.Component<MapStateToPropsT> {
  render() {
    return <NavBar {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateT): MapStateToPropsT => {
  return {
    friends: state.navBar.friends,
  }
}

export default compose(connect<MapStateToPropsT, {}, {}, AppStateT>(mapStateToProps, {}))(
  NavBarContainer
)
