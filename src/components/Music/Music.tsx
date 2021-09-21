//CORE
import { FC } from "react"
//STYLE
import mm from "./Music.module.css"

type MusicT = {
}

const Music: FC<MusicT> = () => {
  return (
    <div className={mm.item}>
      <p>Music</p>
    </div>
  );
};

export default Music;
