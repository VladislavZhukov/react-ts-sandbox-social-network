import React from "react";
import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../../Common/FormControls/FormControls";
import style from "../../../Common/FormControls/FormControls.module.css";

const ProfileDataEditForm = React.memo(({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>SAVE</button>
      </div>
      {error && (
        <div className={style.formSummaryError}>
          {error}
        </div>
      )}
      <div>
        <b>Full name:</b> {createField("fullName", "Full name", Input, [])}
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        {createField("lookingForAJob", null, Input, [], { type: "checkbox" })}
      </div>
      <div>
        <b>My professional skills:</b>{" "}
        {createField(
          "lookingForAJobDescription",
          "my professional skills",
          Textarea,
          []
        )}
      </div>
      <div>
        <b>About me:</b> {createField("aboutMe", "about me", Textarea, [])}
      </div>
      <div>
        <b>Contacts:</b>{" "}
        {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key}>
                <b>{key}:</b> {createField(`contacts.${key}`, `${key}`, Input, [])}
              </div>
            );
          })}
      </div>      
    </form>
  );
});

const ProfileDataReduxForm = reduxForm({ form: "editProfile" })(ProfileDataEditForm);

export default ProfileDataReduxForm;
