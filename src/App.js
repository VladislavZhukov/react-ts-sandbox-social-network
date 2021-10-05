import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import { withRouter } from "react-router";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import { getInitialized } from "./redux/app-selectors";
import store from "./redux/store-redux";
import { withSuspense } from "./hoc/withSuspense";
import ComposeTest from "./example/2/СomposeTest";
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBarContainer />
        <div className="app-wrapper-content">
          <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
          <Route exact path="/news" component={withSuspense(News)} />
          <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
          <Route path="/friends" render={withSuspense(() => <FriendsContainer pageTitle={"MyTestTitle"} />)} />
          <Route exact path="/music" component={withSuspense(Music)} />
          <Route exact path="/settings" component={withSuspense(Settings)} />
          <Route path="/login" render={withSuspense(LoginContainer)} />

          <Route path="/test" render={ComposeTest} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: getInitialized(state)
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))
  (App);

const AppSandboxNetwork = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>)
}

export default AppSandboxNetwork;
