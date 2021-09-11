import { friendsAPI } from "../api/api";
import { FriendType } from "../types/types";
import { updateObjectArray } from "../utils/object-helpers";

const FOLLOW = "sandbox_network/friends/FOLLOW";
const UNFOLLOW = "sandbox_network/friends/UNFOLLOW";
const SET_FRIENDS = "sandbox_network/friends/SET_FRIENDS";
const SET_CURRENT_PAGE = "sandbox_network/friends/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "sandbox_network/friends/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "sandbox_network/friends/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "sandbox_network/friends/TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    friendsData: [] as Array<FriendType>,
    pageSize: 10,
    totalFriendsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of user Ids  
};

type InitialStateType = typeof initialState;

const friendsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: false })
            };
        case SET_FRIENDS:
            return {
                ...state,
                friendsData: action.friendsData
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalFriendsCount: action.totalFriendsCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};
type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number,
}
type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number,
}
type SetFriendsActionType = {
    type: typeof SET_FRIENDS,
    friendsData: Array<FriendType>,
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number,
}
type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT,
    totalFriendsCount: number,
}
type IsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean,
}
type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress: boolean,
    userId: number
}

//ActionCreator
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId: number): UnFollowSuccessActionType => ({ type: UNFOLLOW, userId });
export const setFriends = (friendsData: Array<FriendType>): SetFriendsActionType => ({ type: SET_FRIENDS, friendsData });
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalFriendsCount: number): SetTotalCountActionType => ({ type: SET_TOTAL_COUNT, totalFriendsCount });
export const toggleIsFetching = (isFetching: boolean): IsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): ToggleFollowingInProgressActionType => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, followingInProgress, userId });
//ThunkCreator
export const getFriends = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(page));
    dispatch(toggleIsFetching(true));
    const response = await friendsAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setFriends(response.items));
    dispatch(setTotalCount(response.totalCount));
};
export const follow = (id: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, id, friendsAPI.follow.bind(friendsAPI), followSuccess);
};
export const unfollow = (id: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, id, friendsAPI.unfollow.bind(friendsAPI), unFollowSuccess);
};

export default friendsReducer;

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, id));
    const response = await apiMethod(id)
    if (response.resultCode === 0) {
        dispatch(toggleFollowingInProgress(false, id));
        dispatch(actionCreator(id));
    }
}
