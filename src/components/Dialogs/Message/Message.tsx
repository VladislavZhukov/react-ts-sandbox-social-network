//CORE
import { FC } from "react";
//STYLES
import mm from "./Message.module.css";

type MessageT = {
  content: string
  myMessage: boolean
}

const Message: FC<MessageT> = ({ myMessage, content }) => {
  if (myMessage) {
    return <div className={`${mm.message} ${mm.my}`}>{content}</div>;
  } else {
    return <div className={`${mm.message} ${mm.other}`}>{content}</div>;
  }
}

export default Message;
