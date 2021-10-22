import React, { FC } from "react"
import { ContactsT, ProfileT } from "../../../../types/types"
import Contact from "./Contact/Contact"
import pd from "./ProfileData.module.css"

const ProfileData: FC<ProfileDataT> = React.memo(({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      <div className={pd.descriptionProfileData}>
        {isOwner && (
          <div>
            <button onClick={goToEditMode}>EDIT MODE</button>
          </div>
        )}
        <div>
          <b>Full name:</b> {profile.fullName}
        </div>
        <div>
          <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob && (
          <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
          </div>
        )}
        <div>
          <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
          <b>Contacts:</b>{" "}
          {Object
            .keys(profile.contacts)
            .map((key) => {
              return (profile.contacts[key as keyof ContactsT] !== null) &&
                (profile.contacts[key as keyof ContactsT] !== "") ?
                <Contact
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key as keyof ContactsT]}
                /> : undefined
            })}
        </div>
      </div>
    </div>
  );
});

export default ProfileData

type ProfileDataT = {
  profile: ProfileT
  isOwner: boolean
  goToEditMode: () => void
}