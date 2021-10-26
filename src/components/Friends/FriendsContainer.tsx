//CORE
import { FC, memo } from "react"
import { useSelector } from "react-redux"
//COMPONENT
import Friends from "./Friends"
//SELECTORS
import {
  getIsFetching
} from "../../redux/friends-selectors"
//my libs
import Preloader from "../Common/Preloader/Preloader"

const FriendsPresentationPage: FC<PropsT> = memo((props) => {
  const isFetching = useSelector(getIsFetching)
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Friends />
    </>
  )
})

export default FriendsPresentationPage

type PropsT = {
  pageTitle: string
}
