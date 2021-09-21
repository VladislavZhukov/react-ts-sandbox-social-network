import React, { FC, useState } from "react";
import Preloader from "../../Common/Preloader/Preloader";
import pim from "./ProfileInfo.module.css";
import ProfileStatusHooks from "./ProfileStatusHooks";
import avaUser from "../../../assets/images/avaFriendsDefault.jpg";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataReduxForm from "./ProfileDataEditForm/ProfileDataEditForm";
import { ProfileT } from "../../../types/types";

// type ProfileInfoT = {
//   profile: ProfileT
//   status: string
//   isOwner: boolean

//   updateStatus: (status: string) => void
//   savePhoto: (file: any) => void
//   saveProfile: (updatedProfile: ProfileT) => { messages: string }
// }FC<ProfileInfoT>

const ProfileInfo = React.memo(
  ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    saveProfile,
    ...props
  }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
      return <Preloader />;
    } else {
      const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
          savePhoto(e.target.files[0]);
        }
      };
      const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
          setEditMode(false);
        });
      };
      return (
        <div>
          <div>
            <img
              className={pim.mainPhoto}
              src={
                profile.photos.large != null ? profile.photos.large : avaUser
              }
              alt="your face"
            />
            <div>
              {isOwner && (
                <input
                  className={pim.selectorPhot}
                  type={"file"}
                  onChange={onMainPhotoSelected}
                />
              )}
            </div>
            <ProfileStatusHooks
              status={status}
              s
              updateStatus={updateStatus}
              isOwner={isOwner}
            />
            {editMode ? (
              <ProfileDataReduxForm
                initialValues={profile}
                onSubmit={onSubmit}
                profile={profile}
              />
            ) : (
              <ProfileData
                profile={profile}
                isOwner={isOwner}
                goToEditMode={() => setEditMode(true)}
              />
            )}
          </div>
        </div>
      );
    }
  }
);

export default ProfileInfo;
