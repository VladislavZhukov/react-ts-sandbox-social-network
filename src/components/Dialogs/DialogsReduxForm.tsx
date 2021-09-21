//CORE
import { FC } from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
//UTILS
import { maxLengthCreator, required } from "../../utils/validators/validator"
//my libs
import { Textarea } from "../Common/FormControls/FormControls"

const maxLength200 = maxLengthCreator(200)

export type DialogFormT = {
  myNewMessageText: string
}

const DialogsForm: FC<InjectedFormProps<DialogFormT>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="myNewMessageText"
          placeholder={"Enter you new message"}
          component={Textarea}
          validate={[required, maxLength200]}
        />
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