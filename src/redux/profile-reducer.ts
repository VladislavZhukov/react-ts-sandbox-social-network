/*
 * This code is not refactoring
 * because this typification also has a right to exist
 * left as an example
 */

//CORE
import { stopSubmit } from "redux-form"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
//TYPES
import { AppStateT } from "./store-redux"
import { PhotosT, PostsDataT, ProfileT } from "../types/types"
//API
import { profileAPI } from "../api/profile-api"

const ADD_POST = "SN/PROFILE/ADD_POST"
const DELETE_POST = "SN/PROFILE/DELETE_POST"
const SET_USER_STATUS = "SN/PROFILE/SET_USER_STATUS"
const SET_USER_PROFILE = "SN/PROFILE/SET_USER_PROFILE"
const SET_PHOTO_SUCCESS = "SN/PROFILE/SET_PHOTO_SUCCESS"

let initialState: InitialStateT = {
    postsData: [
        { id: 1, message: "JOJO like PlayStation XD", likeCounter: 10 },
        { id: 2, message: "I need apple", likeCounter: 20 },
    ],
    profile: null,
    status: "",
    newPostText: ""
}

const profileReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case ADD_POST:
            let newPostForm = {
                id: state.postsData.length + 1,
                message: action.newPostText,
                likeCounter: 0,
            }
            return {
                ...state,
                postsData: [...state.postsData, newPostForm]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileT
            }
        default:
            return state
    }
}

//ActionCreator
export const addPost = (newPostText: string): AddPostActionT => ({ type: ADD_POST, newPostText })
export const deletePost = (postId: number): DeletePostActionT => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile: ProfileT): SetUserProfileActionT => ({ type: SET_USER_PROFILE, profile: profile })
export const setUserStatus = (status: string): SetUserStatusActionT => ({ type: SET_USER_STATUS, status: status })
export const setPhotoSuccess = (photos: PhotosT): SetPhotoSuccessActionT => ({ type: SET_PHOTO_SUCCESS, photos: photos })
//ThunkCreator
export const getProfile = (userId: number | null): ThunkT => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response))
}
export const getStatus = (userId: number): ThunkT => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response))
}
export const updateStatus = (status: string): ThunkT => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}
export const savePhoto = (file: File): ThunkT => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.photos))
    }
}
export const saveProfile = (updatedProfile: ProfileT) => async (dispatch: GetDispatchT, getState: GetStateT) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(updatedProfile);
    if (response.resultCode === 0) {
        if (userId !== null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error("userId can`t be null")
        }
    } else {
        dispatch(stopSubmit("editProfile", { _error: response.messages[0] }))
        //modify on --> dispatch(stopSubmit("editProfile", { "contacts": {"facebook": response.messages[0] } }));
        return Promise.reject(response.messages[0])
    }
}

export default profileReducer

type InitialStateT = {
    postsData: Array<PostsDataT>
    profile: ProfileT | null
    status: string | null
    newPostText: string
}
//ActionCreatorType
type ActionT = AddPostActionT | DeletePostActionT | SetUserProfileActionT |
    SetUserStatusActionT | SetPhotoSuccessActionT
type AddPostActionT = {
    type: typeof ADD_POST,
    newPostText: string
}
type DeletePostActionT = {
    type: typeof DELETE_POST,
    postId: number
}
type SetUserProfileActionT = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileT
}
type SetUserStatusActionT = {
    type: typeof SET_USER_STATUS,
    status: string
}
type SetPhotoSuccessActionT = {
    type: typeof SET_PHOTO_SUCCESS,
    photos: PhotosT
}
//ThunkCreatorType
type GetStateT = () => AppStateT
type GetDispatchT = ThunkDispatch<AppStateT, unknown, ActionT | ReturnType<typeof stopSubmit>>
type ThunkT = ThunkAction<Promise<void>, AppStateT, unknown, ActionT>
