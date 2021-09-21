export type OH = {}

type UserT = {
    firstName: string
    lastName: string
    age: number
}

type PhotoT = {
    large: string
    small: string
}

type NullableT<T> = null | T

const initial = {
    age: 15,
    name: 'Korton',
    user: null as UserT | null,
    photo: null as NullableT<PhotoT>
}

type StateT = typeof initial

type ActionsT = ReturnType<typeof AC1> | ReturnType<typeof AC2>

const reducer = (state: StateT = initial, action: ActionsT) => {
    switch (action.type) {
        case "SET-AGE":
            return { ...state, age: action.age }
        case "SET-FULL-NAME":
            return { ...state, name: `${action.firstName} ${action.lastName}` }
        default:
            break
    }
}

const AC1 = (age: number) => ({ type: 'SET-AGE', age } as const)
const AC2 = (firstName: string, lastName: string) => ({ type: 'SET-FULL-NAME', firstName, lastName } as const)
