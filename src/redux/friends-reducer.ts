//CORE
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
//TYPES
import { AppStateT, InferActionsType } from "./store-redux"
import { FriendT } from "../types/types"
//API
import { friendsAPI } from "../api/api"
//utils
import { updateObjectArray } from "../utils/object-helpers"

let initialState = {
    friendsData: [] as Array<FriendT>,
    pageSize: 10,
    totalFriendsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of user Id-s
}

type InitialStateT = typeof initialState

const friendsReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: true })
            };
        case "UNFOLLOW":
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: false })
            };
        case "SET_FRIENDS":
            return {
                ...state,
                friendsData: action.friendsData
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "SET_TOTAL_COUNT":
            return {
                ...state,
                totalFriendsCount: action.totalFriendsCount
            };
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "TOGGLE_FOLLOWING_IN_PROGRESS":
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

//ActionCreatorType
type ActionT = InferActionsType<typeof actions>
//ActionCreator
export const actions = {
    followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
    unFollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
    setFriends: (friendsData: Array<FriendT>) => ({ type: "SET_FRIENDS", friendsData } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),
    setTotalCount: (totalFriendsCount: number) => ({ type: "SET_TOTAL_COUNT", totalFriendsCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => ({
        type: "TOGGLE_FOLLOWING_IN_PROGRESS", followingInProgress, userId
    } as const)
}

//ThunkCreatorType
type DispatchT = Dispatch<ActionT>
type ThunkT = ThunkAction<Promise<void>, AppStateT, unknown, ActionT>
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
    _followUnfollowFlow(dispatch, id, friendsAPI.follow.bind(friendsAPI), actions.followSuccess)
}
export const unfollow = (id: number): ThunkT => async (dispatch, getState) => {
    _followUnfollowFlow(dispatch, id, friendsAPI.unfollow.bind(friendsAPI), actions.unFollowSuccess)
}

export default friendsReducer

//COMMON FUNCTIONS
const _followUnfollowFlow = async (dispatch: DispatchT, id: number, apiMethod: any,
    actionCreator: (userId: number) => ActionT) => {
    dispatch(actions.toggleFollowingInProgress(true, id))
    const response = await apiMethod(id)
    if (response.resultCode === 0) {
        dispatch(actions.toggleFollowingInProgress(false, id))
        dispatch(actionCreator(id))
    }
}
