import { Component, ComponentType, FC, lazy } from "react"
import "./App.css"
import 'antd/dist/antd.css'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { Redirect, withRouter } from "react-router"
import { connect, Provider } from "react-redux"
import { compose } from "redux"
import { initializeApp } from "./redux/app-reducer"
import Preloader from "./components/Common/Preloader/Preloader"
import { getInitialized } from "./redux/app-selectors"
import store, { AppStateT } from "./redux/store-redux"
import { withSuspense } from "./hoc/withSuspense"
import ComposeTest from "./example/2/ComposeTest"
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import Header from "./components/Header/Header"

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

const News = lazy(() => import("./components/News/News"))
const Music = lazy(() => import("./components/Music/Music"))
const Settings = lazy(() => import("./components/Settings/Settings"))
const Login = lazy(() => import("./components/Login/Login"))
const Dialogs = lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))
const FriendsPresentationPage = lazy(() => import("./components/Friends/FriendsContainer"))
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"))
const LearnUseState = lazy(() => import("./example/learnUseState/LearnUseState"))
const LearnUseEffect = lazy(() => import("./example/learnUseEffect/LearnUseEffect"))

const SuspendedDialogs = withSuspense(Dialogs)
const SuspendedLogin = withSuspense(Login)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)
const SuspendedLearnUseState = withSuspense(LearnUseState)
const SuspendedLearnUseEffect = withSuspense(LearnUseEffect)

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
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                  <Menu.Item key="1"><Link to="/profile" />Profile</Menu.Item>
                  <Menu.Item key="2"><Link to="/dialogs" />Messages</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="3"><Link to="/friends" />Friends</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Content">
                  <Menu.Item key="4"><Link to="/chat" />Chat</Menu.Item>
                  <Menu.Item key="5"><Link to="/news" />News</Menu.Item>
                  <Menu.Item key="6"><Link to="/music" />Music</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<NotificationOutlined />} title="Settings">
                  <Menu.Item key="7"><Link to="/settings" />Settings</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<NotificationOutlined />} title="Learn">
                  <Menu.Item key="8"><Link to="/useState" />useState</Menu.Item>
                  <Menu.Item key="9"><Link to="/useEffect" />useEffect</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
                <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route exact path="/news" component={withSuspense(News)} />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/friends" render={withSuspense(() => <FriendsPresentationPage pageTitle={"All Friends =)"} />)} />
                <Route exact path="/music" component={withSuspense(Music)} />
                <Route exact path="/settings" component={withSuspense(Settings)} />
                <Route path="/login" render={() => <SuspendedLogin />} />
                <Route path="/test" render={ComposeTest} />
                <Route path="/chat" render={() => <SuspendedChatPage />} />
                <Route path="/useState" render={() => <SuspendedLearnUseState />} />
                <Route path="/useEffect" render={() => <SuspendedLearnUseEffect />} />
                <Route path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Sandbox Social Network</Footer>
      </Layout>
    )
  }
}

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