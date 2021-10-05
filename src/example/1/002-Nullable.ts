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

export {}
