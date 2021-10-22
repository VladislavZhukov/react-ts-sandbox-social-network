import React, { FC } from "react"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo, { ProfileInfoT } from "./ProfileInfo/ProfileInfo"

const Profile: FC<ProfileInfoT> = React.memo((props) => {
  return (
    <div>
      <ProfileInfo {...props} />
      <MyPostsContainer />
    </div>
  );
});

export default Profile
