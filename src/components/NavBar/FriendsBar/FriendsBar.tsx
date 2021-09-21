//CORE
import { FC } from "react"
//STYLE
import fbm from "./FriendsBar.module.css"

type FriendsBarT = {
  name: string
}

const FriendsBar: FC<FriendsBarT> = ({ name }) => {
  return (
    <div className={fbm.item}>
      {name}
    </div>
  )
}

export default FriendsBar
