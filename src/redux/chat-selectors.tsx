//TYPES
import { AppStateT } from "./store-redux"

export const selectMessages = (state: AppStateT) => { return state.chat.messages }
export const selectStatus = (state: AppStateT) => { return state.chat.status }