import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
  render() {
    return <NavBar {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    friends: state.navBar.friends,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  NavBarContainer
);
