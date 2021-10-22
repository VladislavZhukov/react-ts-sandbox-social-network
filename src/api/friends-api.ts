import { APIResponseT, GetItemsT, instance } from "./api"

export const friendsAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        const response = await instance.get<GetItemsT>(`users?page=${currentPage}&count=${pageSize}`)
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