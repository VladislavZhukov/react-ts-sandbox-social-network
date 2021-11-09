//CORE
import { Button, Col, Image, Layout, Menu, Row } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { FC, memo } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserOutlined } from '@ant-design/icons';
//REDUX
import { logout } from "../../redux/auth-reducer";
//STYLES
import hm from "./Header.module.css"
import { useDispatch, useSelector } from "react-redux";
//SELECTORS
import { selectIsAuth, selectLogin } from "../../redux/auth-selectors";

const Header: FC = memo(() => {
  const { Header } = Layout
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectLogin)

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Header className="header">
      <Row>
        <Col span={1}>
          <Image width={30} src="https://animefox.org/templates/Default/images/logo.png" alt="anime logo 0_0" />
        </Col>
        <Col span={17}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/friends" />Friends</Menu.Item>
          </Menu>
        </Col>
        {isAuth
          ?
          <>
            <Col span={1}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Col>
            <Col span={5}>
              {login} <Button onClick={onLogout}>Logout</Button>
            </Col>
          </>
          :
          <>
            <Col span={6}>
              <Button>
                <NavLink to={"/login"}>Login</NavLink>
              </Button>
            </Col>
          </>}
      </Row>
    </Header >

    // <header className={hm.header}>
    //   <img
    //     src="https://animefox.org/templates/Default/images/logo.png"
    //     alt="anime logo 0_0"
    //   ></img>
    //   <div className={hm.loginBlock}>
    //     {isAuth
    //       ? <div>{login} - <button onClick={logout}>LOGOUT</button></div>
    //       : <NavLink to={"/login"}>Login</NavLink>}
    //   </div>
    // </header>
  )
})

export default Header