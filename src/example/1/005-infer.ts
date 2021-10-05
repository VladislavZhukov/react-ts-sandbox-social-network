const obj = {
    a: { name: "BossBravo" },
    b: { age: 140 },
    c: { site: { title: 'bravoBoss.com' } }
}

type SomeType<T> = T extends { [key: string]: infer U } ? U : never;

let testBot: SomeType<typeof obj> = { age: 10 }

//HERE HOW TO USE

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

type ActionsT = ReturnType<PropertiesType<typeof actions>>

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
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

let Bot: ReturnType<PropertiesType<typeof actions>> = { type: "SET-AGE", age: 15 }

const actions = {
    AC1: (age: number) => ({ type: 'SET-AGE', age } as const),
    AC2: (firstName: string, lastName: string) => ({ type: 'SET-FULL-NAME', firstName, lastName } as const)
}

export {}