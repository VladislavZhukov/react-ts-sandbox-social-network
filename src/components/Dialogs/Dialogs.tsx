//CORE
import { FC } from "react"
//STYLES
import dm from "./Dialogs.module.css"
//TYPES
import { DialogsDataT, MessageDataT } from "../../types/types"
//COMPONENTS
import Message from "./Message/Message"
import DialogItem from "./DialogItem/DialogItem"
import DialogsReduxForm from "./DialogsReduxForm"

const Dialogs: FC<DialogsT> = ({dialogsData, messagesData, addMessage}) => {
  let dialogsElement = dialogsData.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ))

  let messagesElement = messagesData.map((m) => (
    <Message key={m.id} content={m.content} myMessage={m.myMessage} />
  ))

  const onSubmit = (formData: DialogFormValueT) => {
    addMessage(formData.myNewMessageText)
    formData.myNewMessageText = ""
  }

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
  )
}

export default Dialogs

type DialogsT = {
  dialogsData: DialogsDataT
  messagesData: MessageDataT

  addMessage: (newMessageText: string) => void
}
export type DialogFormValueT = {
  myNewMessageText: string
}