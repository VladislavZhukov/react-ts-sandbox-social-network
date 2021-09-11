import React from "react";
import mpm from "./MyPosts.module.css";
import MyPostsReduxForm from "./MyPostsReduxForm/MyPostsReduxForm";
import PublishedPost from "./PublishedPost/PublishedPost.jsx";

const MyPosts = React.memo((props) => {
  let publishedPostElements = props.postsData.map((mp) => (
    <PublishedPost
      key={mp.id}
      id={mp.id}
      message={mp.message}
      likeCounter={mp.likeCounter}
    />
  ));

  const onSubmit = (formData) => {
    props.addPost(formData.myNewPost);
    formData.myNewPost = '';
  };

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
  );
});

export default MyPosts;
