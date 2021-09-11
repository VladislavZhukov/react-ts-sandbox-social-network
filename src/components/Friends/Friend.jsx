import React from "react";
import fm from "./Friends.module.css";
import { NavLink } from "react-router-dom";
import avaUser from "../../assets/images/avaFriendsDefault.jpg";

let Friend = ({ friend, follow, unfollow, followingInProgress, ...props }) => {
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
  );
};

export default Friend;
