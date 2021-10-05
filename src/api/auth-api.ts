import { instance, APIResponseT, ResultCodeE, ResultCodeForCaptchaE } from "./api"

type AuthDataT = {
    id: number
    email: string
    login: string
}
type LoginDataT = {
    userId: number
}

export const authAPI = {
    async auth() {
        const response = await instance.get<APIResponseT<AuthDataT>>(`auth/me`)
        return response.data
    },
    async login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        const response = await instance.post<APIResponseT<LoginDataT, ResultCodeE | ResultCodeForCaptchaE>>(
            `auth/login`, { email, password, rememberMe, captcha }, {})
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`)
        return response.data
    }
}