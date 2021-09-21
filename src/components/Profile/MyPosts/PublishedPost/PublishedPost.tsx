import React, { FC } from "react";
import ppm from "./PublishedPost.module.css";

type PublishedPostT = {
  id: number
  message: string
  likeCounter: number
}

const PublishedPost: FC<PublishedPostT> = ({message, likeCounter}) => {
  return (
    <div className={ppm.item}>
      <div>
        <img
          src="https://1tb.favim.com/preview/7/766/7663/76638/7663819.jpg"
          alt="avatar"
        />
        {message}
        <div>
          <span>Like {likeCounter}</span>
        </div>
      </div>
    </div>
  );
};

export default PublishedPost;
