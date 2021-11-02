//TYPES
import { AppStateT } from "./store-redux"

export const getBestFriends = (state: AppStateT) => { return state.navBar.friends }