import { CommonResponseT, GetItemsT, instance } from "./api"

export const friendsAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        const response = await instance.get<GetItemsT>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
    async follow(userId: number) {
        const response = await instance.post<CommonResponseT>(`follow/${userId}`, {})
        return response.data
    },
    async unfollow(userId: number) {
        const response = await instance.delete<CommonResponseT>(`follow/${userId}`, {})
        return response.data;
    }
}