//CORE
import axios from "axios"
//TYPES
import { FriendT, PhotosT, ProfileT } from "../types/types"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': ''
    }
})

type CommonResponseT = {
    resultCode: number
    messages: Array<string>
    data: object
}

type GetUsersT = {
    items: Array<FriendT>
    totalCount: number
    error: string
}

export const friendsAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        const response = await instance.get<GetUsersT>(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<CommonResponseT>(`follow/${userId}`, {});
        return response.data;
    },
    async unfollow(userId: number) {
        const response = await instance.delete<CommonResponseT>(`follow/${userId}`, {});
        return response.data;
    }
}

export enum ResultCodeE {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaE {
    CaptchaIsRequired = 10
}
type AuthT = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeE
    messages: Array<string>
}
type LoginT = {
    data: {
        userId: number
    }
    resultCode: ResultCodeE | ResultCodeForCaptchaE
    messages: Array<string>
}
export const authAPI = {
    async auth() {
        const response = await instance.get<AuthT>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        const response = await instance.post<LoginT>(`auth/login`, { email, password, rememberMe, captcha }, {});
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`);
        return response.data;
    }
};

type PhotoT = {
    data: {
        photos: PhotosT
    }
    resultCode: number
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return (instance
            .get<ProfileT>(`profile/${userId}`)
        ).then(response => response.data);
    },
    getStatus(userId: number) {
        return (instance
            .get<string>(`profile/status/${userId}`)
        ).then(response => response.data);
    },
    updateStatus(status: string) {
        return (instance
            .put<CommonResponseT>(`profile/status/`, { status: status })
        ).then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return (instance
            .put<PhotoT>(`profile/photo/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        ).then(response => response.data);
    },
    saveProfile(profile: ProfileT) {
        return (instance
            .put<CommonResponseT>(`profile`, profile).then(response => response.data));
    }
}

type CaptchaUrlT = {
    url: string | null
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<CaptchaUrlT>(`security/get-captcha-url`);
    }
}