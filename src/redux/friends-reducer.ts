//CORE
import { Dispatch } from "redux"
//TYPES
import { BaseThunkType, InferActionsType } from "./store-redux"
import { FriendT } from "../types/types"
//API
import { friendsAPI } from "../api/friends-api"
//utils
import { updateObjectArray } from "../utils/object-helpers"
import { APIResponseT } from "../api/api"

let initialState = {
    friendsData: [] as Array<FriendT>,
    pageSize: 10,
    totalFriendsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of user Id-s
}

const friendsReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case "SN/FRIENDS/FOLLOW":
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: true })
            };
        case "SN/FRIENDS/UNFOLLOW":
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: false })
            };
        case "SN/FRIENDS/SET_FRIENDS":
            return {
                ...state,
                friendsData: action.friendsData
            };
        case "SN/FRIENDS/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "SN/FRIENDS/SET_TOTAL_COUNT":
            return {
                ...state,
                totalFriendsCount: action.totalFriendsCount
            };
        case "SN/FRIENDS/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "SN/FRIENDS/TOGGLE_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}
//ActionCreator
export const actions = {
    followSuccess: (userId: number) => ({ type: "SN/FRIENDS/FOLLOW", userId } as const),
    unFollowSuccess: (userId: number) => ({ type: "SN/FRIENDS/UNFOLLOW", userId } as const),
    setFriends: (friendsData: Array<FriendT>) => ({ type: "SN/FRIENDS/SET_FRIENDS", friendsData } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SN/FRIENDS/SET_CURRENT_PAGE", currentPage } as const),
    setTotalCount: (totalFriendsCount: number) => ({ type: "SN/FRIENDS/SET_TOTAL_COUNT", totalFriendsCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "SN/FRIENDS/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => ({
        type: "SN/FRIENDS/TOGGLE_FOLLOWING_IN_PROGRESS", followingInProgress, userId
    } as const)
}
//ThunkCreator
export const getFriends = (page: number, pageSize: number): ThunkT => {
    return async (dispatch, getState) => {
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.toggleIsFetching(true))
        const response = await friendsAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setFriends(response.items))
        dispatch(actions.setTotalCount(response.totalCount))
    }
}
export const follow = (id: number): ThunkT => async (dispatch, getState) => {
    await _followUnfollowFlow(dispatch, id, friendsAPI.follow.bind(friendsAPI), actions.followSuccess)
}
export const unfollow = (id: number): ThunkT => async (dispatch, getState) => {
    await _followUnfollowFlow(dispatch, id, friendsAPI.unfollow.bind(friendsAPI), actions.unFollowSuccess)
}

export default friendsReducer

export type InitialStateT = typeof initialState
type ActionT = InferActionsType<typeof actions>
type DispatchT = Dispatch<ActionT>
type ThunkT = BaseThunkType<ActionT>

//COMMON FUNCTIONS
const _followUnfollowFlow = async (dispatch: DispatchT,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseT>,
    actionCreator: (userId: number) => ActionT) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actions.toggleFollowingInProgress(false, userId))
        dispatch(actionCreator(userId))
    }
}


