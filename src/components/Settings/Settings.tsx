//CORE
import { FC } from "react"
//STYLES
import sm from "./Settings.module.css"

type SettingsT = {
}

const Settings: FC<SettingsT> = () => {
    return(
        <div className={sm.item}>
            <p>Settings</p>
        </div>
    )
}

export default Settings