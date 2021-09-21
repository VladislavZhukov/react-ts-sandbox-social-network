//CORE
import React from "react"
import { connect } from "react-redux"
//COMPONENT
import Login from "./Login"
//TYPES
import { AppStateT } from "../../redux/store-redux"
//my libs
import { login, logout } from "../../redux/auth-reducer"

type MapStateToPropsT = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchPropsT = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
  logout: () => void
}

type PropsT = MapStateToPropsT & MapDispatchPropsT

class LoginContainer extends React.Component<PropsT> {
  componentDidMount() { }
  render() {
    return <Login {...this.props} />
  }
}
const mapStateToProps = (state: AppStateT): MapStateToPropsT => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})
const mapDispatchToProps: MapDispatchPropsT = { login, logout }

export default connect<MapStateToPropsT, MapDispatchPropsT, {}, AppStateT>(mapStateToProps, mapDispatchToProps)(LoginContainer)
