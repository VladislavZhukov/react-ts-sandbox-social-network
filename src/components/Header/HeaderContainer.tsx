//CORE
import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
//TYPES
import { AppStateT } from "../../redux/store-redux"
//COMPONENT
import Header from "./Header"
//my libs
import { logout } from "../../redux/auth-reducer"

class HeaderContainer extends React.Component<PropsT> {
  render() {
    return <Header {...this.props} />
  }
}
const mapStateToProps = (state: AppStateT): MapStateToPropsT => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})
const mapDispatchToProps: mapDispatchToPropsT = { logout }

export default compose(connect<MapStateToPropsT, mapDispatchToPropsT, {}, AppStateT>(
  mapStateToProps, mapDispatchToProps))(HeaderContainer)

type MapStateToPropsT = {
  isAuth: boolean
  login: string | null
}

type mapDispatchToPropsT = {
  logout: () => void
}

type PropsT = MapStateToPropsT & mapDispatchToPropsT
