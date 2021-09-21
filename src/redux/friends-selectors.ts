//CORE
import { createSelector } from "reselect"
//TYPES
import { AppStateT } from "./store-redux"

const getAllFriendsDataSelector = (state: AppStateT) => {
    return state.friendsPage.friendsData
}
export const getAllFriendsData = createSelector(getAllFriendsDataSelector, (friends) => {
    return friends.filter(f => true)
})
export const getPageSize = (state: AppStateT) => { return state.friendsPage.pageSize }
export const getTotalFriendsCount = (state: AppStateT) => { return state.friendsPage.totalFriendsCount }
export const getCurrentPage = (state: AppStateT) => { return state.friendsPage.currentPage }
export const getIsFetching = (state: AppStateT) => { return state.friendsPage.isFetching }
export const getFollowingInProgress = (state: AppStateT) => { return state.friendsPage.followingInProgress }