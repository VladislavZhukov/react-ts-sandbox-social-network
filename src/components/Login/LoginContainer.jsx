import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { login, logout } from "../../redux/auth-reducer";

class LoginContainer extends React.Component {
  componentDidMount() {}
  render() {
    return <Login {...this.props} />;
  }
}
const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, captchaUrl: state.auth.captchaUrl });
const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
