import { useEffect, useState } from "react"
import luem from "./LearnUseEffect.module.css"
import { UserDetails } from "./UserDetails/UserDetails"
import { UsersSearch } from "./UserSearch/UsersSearch"
import { SearchUserT, UsersList } from "./UsersList/UsersList"

const INITIAL_SEARCH = 'it-kamasutra'

const LearnUseEffect = () => {
    const [selectedUsers, setSelectedUsers] = useState<SearchUserT | null>(null)
    const [searchTerm, setSearchTerm] = useState(INITIAL_SEARCH)

    useEffect(() => {
        console.log(`SYNC TAB TITLE`)
        if (selectedUsers) {
            document.title = selectedUsers.login
        }
    }, [selectedUsers])

    return (
        <>
            <div className={luem.container}>
                <div>
                    {<UsersSearch value={searchTerm} onSubmit={(value = searchTerm) => { setSearchTerm(value) }} />}
                    <button onClick={() => setSearchTerm(INITIAL_SEARCH)}>RESET</button>
                    <UsersList term={searchTerm} selectedUser={selectedUsers} onUserSelect={setSelectedUsers} />
                </div>
                <div>
                    <UserDetails user={selectedUsers} />
                </div>
            </div>
        </>
    )
}

export default LearnUseEffect

export type UserT = {
    login: string
    id: number
    avatar_url: string
    followers: number
} | null