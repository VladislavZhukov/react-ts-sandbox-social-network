import React from "react";
import ppm from "./PublishedPost.module.css";

const PublishedPost = (props) => {
  return (
    <div className={ppm.item}>
      <div>
        <img
          src="https://1tb.favim.com/preview/7/766/7663/76638/7663819.jpg"
          alt="avatar"
        />
        {props.message}
        <div>
          <span>Like {props.likeCounter}</span>
        </div>
      </div>
    </div>
  );
};

export default PublishedPost;
