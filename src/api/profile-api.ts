import { CommonResponseT, instance, APIResponseT } from "./api"
import { PhotosT, ProfileT } from "../types/types"

type PhotoT = {
    photos: PhotosT
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
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return (instance
            .put<APIResponseT<PhotoT>>(`profile/photo/`, formData, {
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