import { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../../utils/validators/validator";
import { Textarea } from "../../../Common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10);

const MyPostsForm: FC<InjectedFormProps<MyPostsFormT>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="myNewPost"
          placeholder={"Enter your new post"}
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

export type MyPostsFormT = {
  myNewPost: string
}
