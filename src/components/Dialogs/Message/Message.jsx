import React from "react";

import mm from "./Message.module.css";

const Message = (props) => {
  if (props.myMessage) {
    return <div className={`${mm.message} ${mm.my}`}>{props.content}</div>;
  } else {
    return <div className={`${mm.message} ${mm.other}`}>{props.content}</div>;
  }
};

export default Message;
