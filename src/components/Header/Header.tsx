//CORE
import { FC } from "react"
import { NavLink } from "react-router-dom"
//STYLES
import hm from "./Header.module.css"

const Header: FC<HeaderT> = ({ isAuth, login, logout }) => {
  return (
    <header className={hm.header}>
      <img
        src="https://animefox.org/templates/Default/images/logo.png"
        alt="anime logo 0_0"
      ></img>
      <div className={hm.loginBlock}>
        {isAuth
          ? <div>{login} - <button onClick={logout}>LOGOUT</button></div>
          : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header

type HeaderT = {
  isAuth: boolean
  login: string | null
  logout: () => void
}