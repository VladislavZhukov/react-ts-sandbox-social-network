//CORE
import { FC, memo } from "react"
//STYLES
import dm from "./Dialogs.module.css"
//COMPONENTS
import Message from "./Message/Message"
import DialogItem from "./DialogItem/DialogItem"
import DialogsReduxForm from "./DialogsReduxForm"
import { useDispatch, useSelector } from "react-redux"
import { getDialogsData, getMessageData } from "../../redux/dialogs-selectors"
import { actions } from "../../redux/dialogs-reducer"

const Dialogs: FC = memo(() => {
  const dialogsData = useSelector(getDialogsData)
  const messagesData = useSelector(getMessageData)

  const dispatch = useDispatch()

  let dialogsElement = dialogsData.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ))

  let messagesElement = messagesData.map((m) => (
    <Message key={m.id} content={m.content} myMessage={m.myMessage} />
  ))

  const onSubmit = (formData: DialogFormValueT) => {
    dispatch(actions.addMessage(formData.myNewMessageText))
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
})

export default Dialogs

export type DialogFormValueT = {
  myNewMessageText: string
}