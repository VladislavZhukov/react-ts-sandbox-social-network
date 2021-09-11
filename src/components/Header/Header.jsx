import React from "react";
import { NavLink } from "react-router-dom";
import hm from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={hm.header}>
      <img
        src="https://animefox.org/templates/Default/images/logo.png"
        alt="anime logo 0_0"
      ></img>
      <div className={hm.loginBlock}>
        {props.isAuth
         ? <div>{props.login} - <button onClick={props.logout}>LOGOUT</button></div>
         : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
