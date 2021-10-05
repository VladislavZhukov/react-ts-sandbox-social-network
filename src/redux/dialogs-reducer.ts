import { DialogsDataT, MessageDataT } from "../types/types"
import { InferActionsType } from "./store-redux";

let initialState = {
    messagesData: [
        { id: 1, content: "Hi", myMessage: true },
        { id: 2, content: "how is the dude himself? =))", myMessage: true },
        { id: 3, content: "Hi dude, what's new? 0_0", myMessage: false },
        { id: 4, content: "Where is my donut?", myMessage: false },
        { id: 5, content: "Did you looked at Naruto?", myMessage: false },
        { id: 6, content: "I like cars", myMessage: true },
        { id: 7, content: "You need JOJO anime", myMessage: false },
    ] as MessageDataT,
    dialogsData: [
        { id: 1, name: "Andrey" },
        { id: 2, name: "Viktor" },
        { id: 3, name: "Stepan" },
        { id: 4, name: "Viktoria" },
        { id: 5, name: "Tolik" },
    ] as DialogsDataT,
    newMessageText: ""
}

let dialogsReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case "SN/DIALOGS/ADD_MESSAGE":
            let newMessage = {
                id: state.messagesData.length + 1,
                content: action.newMessageText,
                myMessage: true,
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return state;
    }
}
//ActionCreator
export const actions = {
    addMessage: (newMessageText: string) => ({ type: "SN/DIALOGS/ADD_MESSAGE", newMessageText } as const)
}

export default dialogsReducer

type InitialStateT = typeof initialState
type ActionT = InferActionsType<typeof actions>
