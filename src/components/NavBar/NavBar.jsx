import React from "react";
import { NavLink } from "react-router-dom";
import FriendsBar from "./FriendsBar/FriendsBar";
import nbm from "./NavBar.module.css";

const NavBar = (props) => {
  let friendsBarElement = props.friends.map((f) => (
    <FriendsBar key={f.id} name={f.name} />
  ));

  return (
    <nav className={nbm.navigation}>
      <div className={nbm.item}>
        <div>
          <NavLink to="/profile" activeClassName={nbm.active}>
            Profile
          </NavLink>
        </div>
        <div>
          <NavLink to="/news" activeClassName={nbm.active}>
            News
          </NavLink>
        </div>
        <div>
          <NavLink to="/dialogs" activeClassName={nbm.active}>
            Messages
          </NavLink>
        </div>
        <div>
          <NavLink to="/friends" activeClassName={nbm.active}>
            Friends
          </NavLink>
        </div>
        <div>
          <NavLink to="/music" activeClassName={nbm.active}>
            Music
          </NavLink>
        </div>
        <div>
          <NavLink to="/settings" activeClassName={nbm.active}>
            Settings
          </NavLink>
        </div>
        <div className={nbm.friends}>FRIENDS</div>
        <div>{friendsBarElement}</div>
      </div>
    </nav>
  );
};

export default NavBar;
