import React from "react";
import { NavLink } from "react-router-dom";

import dmi from "./DialogItem.module.css";

const DialogItem = (props) => {
  let path = `/dialogs/${props.id}`;
  return (
    <div className={dmi.items}>
      <img
        src="https://1tb.favim.com/preview/7/766/7663/76638/7663819.jpg"
        alt="avatar"
      />
      <NavLink to={path} className={dmi.items + " " + dmi.active}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
