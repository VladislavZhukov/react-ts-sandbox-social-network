import React from "react";
import dm from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import DialogsReduxForm from "./DialogsReduxForm";

const Dialogs = (props) => {  
  let dialogsElement = props.dialogsData.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));

  let messagesElement = props.messagesData.map((m) => (
    <Message key={m.id} content={m.content} myMessage={m.myMessage} />
  ));

  const onSubmit = (formData) => {
    props.addMessage(formData.myNewMessageText);
    formData.myNewMessageText = "";
  };

  return (
    <div className={dm.dialogs}>
      <div>{dialogsElement}</div>
      <div>
        <div>{messagesElement}</div>
        <div>
          <DialogsReduxForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
