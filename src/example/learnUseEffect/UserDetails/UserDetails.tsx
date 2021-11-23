import axios from "axios"
import { FC, useEffect, useState } from "react"
import { UserT } from "../LearnUseEffect"
import { SearchUserT } from "../UsersList/UsersList"
import { Timer } from "./Timer/Timer"

type UsersDetailsPropsT = {
    user: SearchUserT | null
}

export const UserDetails: FC<UsersDetailsPropsT> = ({ user }) => {
    const initStartTimerValue = 10

    const [userDetails, setUserDetails] = useState<UserT | null>(null)
    const [seconds, setSeconds] = useState(initStartTimerValue)

    useEffect(() => {
        console.log(`SYNC USERS DETAILS`)
        if (!!user) {
            axios
                .get<UserT>(`https://api.github.com/users/${user.login}`)
                .then(res => {
                    setSeconds(initStartTimerValue)
                    setUserDetails(res.data)
                })
        }
    }, [user])

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return (
        <>
            {userDetails &&
                <div>
                    <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()} />
                    <h2>{userDetails.login}</h2>
                    <img src={userDetails.avatar_url} />
                    <br />
                    {userDetails?.login} followers: {userDetails.followers}
                </div>
            }
        </>
    )
}