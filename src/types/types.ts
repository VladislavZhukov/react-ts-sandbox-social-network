export type PostsDataT = {
    id: number
    message: string
    likeCounter: number
}
export type ContactsT = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosT = {
    small: string | null
    large: string | null
}
export type ProfileT = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ContactsT
    photos: PhotosT
}
export type FriendT = {
    id: number
    name: string
    status: string
    photos: PhotosT
    followed: boolean
}
export type BestFriendsT = {
    id: number
    name: string
}
export type MessageT = {
    id: number
    content: string
    myMessage: boolean
}
export type DialogT = {
    id: number
    name: string
}
export type MessageDataT = Array<MessageT>
export type DialogsDataT = Array<DialogT>