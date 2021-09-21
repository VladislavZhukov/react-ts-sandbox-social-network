import React, { FC } from "react";
import { PostsDataT } from "../../../types/types";
import mpm from "./MyPosts.module.css";
import MyPostsReduxForm from "./MyPostsReduxForm/MyPostsReduxForm";
import PublishedPost from "./PublishedPost/PublishedPost";

type MyPostsT = {
  postsData: Array<PostsDataT>

  addPost: (myNewPost: string) => void
}
export type MyPostsFormT = {
  myNewPost: string
}

const MyPosts: FC<MyPostsT> = React.memo(({ postsData, addPost }) => {
  let publishedPostElements = postsData.map((mp) => (
    <PublishedPost
      key={mp.id}
      id={mp.id}
      message={mp.message}
      likeCounter={mp.likeCounter}
    />
  ))

  const onSubmit = (formData: MyPostsFormT) => {
    addPost(formData.myNewPost)
    formData.myNewPost = ''
  }

  return (
    <div>
      <div className={mpm.content}>
        <div>MY NEW POST</div>
        <div>
          <MyPostsReduxForm onSubmit={onSubmit} />
        </div>
      </div>
      {publishedPostElements}
    </div>
  )
})

export default MyPosts
