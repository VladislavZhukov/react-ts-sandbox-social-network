//CORE
import axios from "axios"
import { FriendT } from "../types/types"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bbc6f2cb-04a8-44a9-a8c9-4fc9044f6651'
    }
})

export enum ResultCodeE {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaE {
    CaptchaIsRequired = 10
}
export type GetItemsT = {
    items: Array<FriendT>
    totalCount: number
    error: string | null
}
export type CommonResponseT = {
    resultCode: number
    messages: Array<string>
    data: object
}
export type APIResponseT<D = {}, RC = ResultCodeE> = {
    data: D
    messages: Array<string>
    resultCode: RC
}