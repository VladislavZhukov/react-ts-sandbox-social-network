import axios from "axios"
import ulm from "./UsersList.module.css"
import { FC, useEffect, useState } from "react"

export type SearchUserT = {
    login: string
    id: number
}
type SearchResultT = {
    items: SearchUserT[]
}

export type UsersListPropsT = {
    term: string
    selectedUser: SearchUserT | null
    onUserSelect: (user: SearchUserT) => void
}


export const UsersList: FC<UsersListPropsT> = ({ term, selectedUser, onUserSelect }) => {
    const [users, setUsers] = useState<SearchUserT[]>([])

    useEffect(() => {
        console.log(`SYNC USERS`)
        axios
            .get<SearchResultT>(`https://api.github.com/search/users?q=${term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [term])

    return (
        <>
            <div>
                <ul>
                    {users
                        .map(u => <li key={u.id} className={selectedUser === u ? ulm.selected : ''}
                            onClick={() => {
                                onUserSelect(u)
                            }}>{u.login}</li>)
                    }
                </ul>
            </div>
        </>
    )
}