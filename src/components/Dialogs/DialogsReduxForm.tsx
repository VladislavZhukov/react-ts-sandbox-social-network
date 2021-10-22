//CORE
import { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
//UTILS
import { maxLengthCreator, required } from "../../utils/validators/validator"
//my libs
import { createField, GetStringKeys, Textarea } from "../Common/FormControls/FormControls"

const maxLength200 = maxLengthCreator(200)

const DialogsForm: FC<InjectedFormProps<DialogFormT>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createField<DialogsFormValueK>("myNewMessageText", "Enter a new message", Textarea, [required, maxLength200])}
      </div>
      <div>
        <button>SEND MESSAGE</button>
      </div>
    </form>
  )
}

const DialogsReduxForm = reduxForm<DialogFormT>({ form: "dialogsMyNewMessage" })(
  DialogsForm
)

export default DialogsReduxForm

export type DialogFormT = {
  myNewMessageText: string
}

type DialogsFormValueT = {
  myNewMessageText: string
}
type DialogsFormValueK = GetStringKeys<DialogsFormValueT>