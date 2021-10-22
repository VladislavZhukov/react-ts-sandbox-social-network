import React, { Component, ComponentType, FC } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import { Redirect, withRouter } from "react-router";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import { getInitialized } from "./redux/app-selectors";
import store, { AppStateT } from "./redux/store-redux";
import { withSuspense } from "./hoc/withSuspense";
import ComposeTest from "./example/2/ComposeTest";
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedLogin = withSuspense(LoginContainer)
const ProfileSuspended = withSuspense(ProfileContainer)

class App extends Component<PropsT> {
  catchAllUnhandError = (e: PromiseRejectionEvent) => {
    alert(`Some error occurred ${e}`)
  }
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBarContainer />
        <div className="app-wrapper-content">
          <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
          <Route path="/profile/:userId?" render={() => <ProfileSuspended />} />
          <Route exact path="/news" component={withSuspense(News)} />
          <Route path="/dialogs" render={() => <SuspendedDialogs />} />
          <Route path="/friends" render={withSuspense(() => <FriendsContainer pageTitle={"All Friends =)"} />)} />
          <Route exact path="/music" component={withSuspense(Music)} />
          <Route exact path="/settings" component={withSuspense(Settings)} />
          <Route path="/login" render={() => <SuspendedLogin />} />

          <Route path="/test" render={ComposeTest} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: AppStateT): MapStatePropsT => ({
  initialized: getInitialized(state)
})
const mapDispatchToProps: MapDispatchPropsT = {
  initializeApp
}

const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))
  (App);

const AppSandboxNetwork: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>)
}

export default AppSandboxNetwork;

type MapStatePropsT = {
  initialized: boolean
}
type MapDispatchPropsT = {
  initializeApp: () => void
}
type PropsT = MapStatePropsT & MapDispatchPropsT