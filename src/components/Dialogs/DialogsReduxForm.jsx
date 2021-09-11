import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import { Textarea } from "../Common/FormControls/FormControls";

const maxLength200 = maxLengthCreator(200);

const DialogsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="myNewMessageText"
          placeholder={"Enter you new message"}
          component={Textarea}
          validate={[ required, maxLength200 ]}
        />
      </div>
      <div>
        <button>SEND MESSAGE</button>
      </div>
    </form>
  );
};

const DialogsReduxForm = reduxForm({ form: "dialogsMyNewMessage" })(
  DialogsForm
);

export default DialogsReduxForm;
