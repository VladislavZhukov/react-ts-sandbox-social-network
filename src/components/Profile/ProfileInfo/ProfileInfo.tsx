import React, { ChangeEvent, FC, useState } from "react";
import Preloader from "../../Common/Preloader/Preloader";
import pim from "./ProfileInfo.module.css";
import ProfileStatusHooks from "./ProfileStatusHooks";
import avaUser from "../../../assets/images/avaFriendsDefault.jpg";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataReduxForm from "./ProfileDataEditForm/ProfileDataEditForm";
import { ProfileT } from "../../../types/types";

export type ProfileInfoT = {
  profile: ProfileT | null
  status: string | null
  isOwner: boolean

  savePhoto: (file: File) => void
  updateStatus: (status: string) => void
  saveProfile: (updatedProfile: ProfileT) => Promise<any>
}

const ProfileInfo: FC<ProfileInfoT> = React.memo(
  ({
    status,
    profile,
    isOwner,
    savePhoto,
    saveProfile,
    updateStatus,
    ...props
  }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
      return <Preloader />;
    } else {
      const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          savePhoto(e.target.files[0]);
        }
      };
      const onSubmit = (formData: ProfileT) => {
        //TODO remove then
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
              status={status === null ? "" : status}
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
      )
    }
  }
)

export default ProfileInfo;
