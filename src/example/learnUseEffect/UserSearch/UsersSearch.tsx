import { FC, useEffect, useState } from "react"

type UsersSearchPropsT = {
    value: string
    onSubmit: (fixedValue: string) => void
}

export const UsersSearch: FC<UsersSearchPropsT> = ({ value, onSubmit }) => {
    const [tempSearch, setTempSearch] = useState(value)

    useEffect(() => {
        setTempSearch(value)
    }, [value, onSubmit])

    return (
        <>
            <div>
                <input placeholder="search"
                    value={tempSearch}
                    onChange={e => { setTempSearch(e.currentTarget.value) }} />
                <button onClick={() => {
                    onSubmit(tempSearch)
                }}>Find</button>
            </div>
        </>
    )
}