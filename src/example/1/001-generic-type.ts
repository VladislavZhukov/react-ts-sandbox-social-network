type UserT = {
    firstName: string
    lastName: string
    age: number
}

type PhotoT = {
    large: string
    small: string
}

type ServerResponseT<D> = {
    errorCode: number
    message: Array<string>
    data: D
}

const response1: ServerResponseT<UserT> = {
    errorCode: 1,
    message: ['test', 'jojo'],
    data: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        age: 90
    }
}

const response2: ServerResponseT<PhotoT> = {
    errorCode: 2,
    message: ['x', 'test on bob'],
    data: {
        large: '1000',
        small: '2000'
    }
}

export {}
