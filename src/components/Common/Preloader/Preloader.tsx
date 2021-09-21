//CORE
import { FC } from "react"
//img
import preloader from "../../../assets/images/preloader.svg"

type PreloaderT = {
}

let Preloader: FC<PreloaderT> = () => {
  return <img src={preloader} alt="preloader..." />
};

export default Preloader
