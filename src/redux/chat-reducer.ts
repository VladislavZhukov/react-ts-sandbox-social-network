//CORE
import { Dispatch } from "redux"
//TYPES
import { BaseThunkType, InferActionsType } from "./store-redux"
//API
import { chatAPI, ChatMessageAPIType, StatusT } from "../api/chat-api"
import { v1 as uuidv4 } from 'uuid'

export type ChatMessageT = ChatMessageAPIType & { id: string }

let initialState = {
    messages: [] as ChatMessageT[],
    status: 'pending' as StatusT
}



const chatReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: uuidv4() }))]
                .filter((m, i, a) => i >= a.length - 100)
            }
        case "SN/CHAT/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageCreator = (dispatch: DispatchT) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusT) => void) | null = null
const statusChangedCreator = (dispatch: DispatchT) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
//ActionCreator
export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: "SN/CHAT/MESSAGES_RECEIVED", payload: { messages } } as const),
    statusChanged: (status: StatusT) => ({ type: "SN/CHAT/STATUS_CHANGED", payload: { status } } as const)
}
//ThunkCreator
export const startMessagesListening = (): ThunkT => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedCreator(dispatch))
}
export const stopMessagesListening = (): ThunkT => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkT => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer

export type InitialStateT = typeof initialState

type ActionT = InferActionsType<typeof actions>
type DispatchT = Dispatch<ActionT>
type ThunkT = BaseThunkType<ActionT>


