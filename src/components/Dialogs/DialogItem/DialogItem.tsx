//CORE
import { FC } from "react"
import { NavLink } from "react-router-dom"
//STYLES
import dmi from "./DialogItem.module.css"

type DialogItemT = {
  id: number
  name: string
}

const DialogItem: FC<DialogItemT> = ({ id, name }) => {
  let path: string = `/dialogs/${id}`;
  return (
    <div className={dmi.items}>
      <img
        src="https://1tb.favim.com/preview/7/766/7663/76638/7663819.jpg"
        alt="avatar"
      />
      <NavLink to={path} className={dmi.items + " " + dmi.active}>
        {name}
      </NavLink>
    </div>
  )
}

export default DialogItem
