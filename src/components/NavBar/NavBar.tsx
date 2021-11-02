//CORE
import { FC } from "react"
import { NavLink } from "react-router-dom"
//STYLE
import nbm from "./NavBar.module.css"
//COMPONENTS
import FriendsBar from "./FriendsBar/FriendsBar"
import { getBestFriends } from "../../redux/navbar-selectors"
import { useSelector } from "react-redux"

const NavBar: FC = () => {
  const friends = useSelector(getBestFriends)

  let friendsBarElement = friends.map((f) => (
    <FriendsBar key={f.id} name={f.name} />
  ))

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
  )
}

export default NavBar
