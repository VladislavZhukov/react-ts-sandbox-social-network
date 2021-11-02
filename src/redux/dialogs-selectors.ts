//TYPES
import { AppStateT } from "./store-redux"

export const getDialogsData = (state: AppStateT) => { return state.dialogPage.dialogsData }
export const getMessageData = (state: AppStateT) => { return state.dialogPage.messagesData }
export const getNewMessageText = (state: AppStateT) => { return state.dialogPage.newMessageText }