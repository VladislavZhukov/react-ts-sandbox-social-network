import { APIResponseT, GetItemsT, instance } from "./api"

export const friendsAPI = {
    async getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean = null) {
        const response = await instance.get<GetItemsT>(`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`))
        return response.data
    },
    async follow(userId: number) {
        const response = await instance.post<APIResponseT>(`follow/${userId}`, {})
        return response.data
    },
    async unfollow(userId: number) {
        const response = await instance.delete<APIResponseT>(`follow/${userId}`, {})
        return response.data;
    }
}