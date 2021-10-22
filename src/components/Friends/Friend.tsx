//CORE
import { FC } from "react"
import { NavLink } from "react-router-dom"
//STYLES
import fm from "./Friends.module.css"
//TYPES
import { FriendT } from "../../types/types"
//img
import avaUser from "../../assets/images/avaFriendsDefault.jpg"

let Friend: FC<FriendCT> = ({ friend, follow, unfollow, followingInProgress }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + friend.id}>
            <img
              src={friend.photos.small != null ? friend.photos.small : avaUser}
              alt="ava =)"
              className={fm.userAvatar}
            />
          </NavLink>
        </div>
        <div>
          {friend.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === friend.id)}
              onClick={() => {
                unfollow(friend.id);
              }}
            >
              UNFOLLOW
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === friend.id)}
              onClick={() => {
                follow(friend.id);
              }}
            >
              FOLLOW
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{friend.name}</div>
          <div>{friend.status}</div>
        </span>
        <span>
          <div>{"f.location.country"}</div>
          <div>{"f.location.city"}</div>
        </span>
      </span>
    </div>
  )
}

export default Friend

type FriendCT = {
  id: number
  friend: FriendT
  followingInProgress: Array<number>

  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
