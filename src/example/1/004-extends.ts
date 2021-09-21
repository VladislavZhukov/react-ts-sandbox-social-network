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

type JediKnight<T> = T extends 'user' ? UserT :
    T extends 'photo' ? PhotoT : never

let a: JediKnight<'user'> = {
    firstName: 'John',
    lastName: 'Johnson',
    age: 30
}

let b: JediKnight<'photo'> = {
    large: 'https://jediHousingMaintenanceOffice/archive/JohnJohnson-4.jpg',
    small: 'https://jediHousingMaintenanceOffice/archive/JohnJohnson-4.jpg'
}