import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../../utils/validators/validator";
import { Textarea } from "../../../Common/FormControls/FormControls";

export type MyPostsFormT = {
  myNewPost: string
}

const maxLength10 = maxLengthCreator(10);

const MyPostsForm: FC<InjectedFormProps<MyPostsFormT>>  = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="myNewPost"
          placeholder={"Enter your new post"}
          component={Textarea}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>PUBLISH</button>
      </div>
    </form>
  );
};

const MyPostsReduxForm = reduxForm<MyPostsFormT>({ form: "profileMyNewPost" })(MyPostsForm);

export default MyPostsReduxForm;
