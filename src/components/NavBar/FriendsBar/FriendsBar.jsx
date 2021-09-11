import React from "react";
import fbm from "./FriendsBar.module.css";

const FriendsBar = (props) => {
  
  return (
    <div className={fbm.item}>      
      {props.name}      
    </div>
  );
};

export default FriendsBar;
