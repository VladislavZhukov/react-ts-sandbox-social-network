import { instance } from "./api"

type CaptchaUrlT = {
    url: string | null
}

export const securityApi = {
    async getCaptchaUrl() {
        const response = await instance.get<CaptchaUrlT>(`security/get-captcha-url`)
        return response.data
    }
}