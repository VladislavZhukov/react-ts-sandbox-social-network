import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { ProfileT } from "../../../../types/types"
import {
  createField,
  GetStringKeys,
  Input,
  Textarea,
} from "../../../Common/FormControls/FormControls"
import style from "../../../Common/FormControls/FormControls.module.css"



const ProfileDataEditForm: FC<InjectedFormProps<ProfileT, ProfileDataEditFormOwnPropsT> &
  ProfileDataEditFormOwnPropsT> = React.memo(({ handleSubmit, error, profile }) => {
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
          <b>Full name:</b> {createField<ProfileDataEditFormValueK>("fullName", "Full name", Input, [])}
        </div>
        <div>
          <b>Looking for a job:</b>{" "}
          {createField<ProfileDataEditFormValueK>("lookingForAJob", undefined, Input, [], { type: "checkbox" })}
        </div>
        <div>
          <b>My professional skills:</b>{" "}
          {createField<ProfileDataEditFormValueK>(
            "lookingForAJobDescription",
            "my professional skills",
            Textarea,
            []
          )}
        </div>
        <div>
          <b>About me:</b> {createField<ProfileDataEditFormValueK>("aboutMe", "about me", Textarea, [])}
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
    )
  })

const ProfileDataReduxForm = reduxForm<ProfileT, ProfileDataEditFormOwnPropsT>
  ({ form: "editProfile" })(ProfileDataEditForm)

export default ProfileDataReduxForm

type ProfileDataEditFormOwnPropsT = {
  profile: ProfileT
}
type ProfileDataEditFormValueK = GetStringKeys<ProfileT>
