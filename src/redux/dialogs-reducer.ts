const ADD_MESSAGE = "sandbox_network/dialogs/ADD-MESSAGE"

type MessageT = {
    id: number
    content: string
    myMessage: boolean
}
type DialogT = {
    id: number
    name: string
}
export type MessageDataT = Array<MessageT>
export type DialogsDataT = Array<DialogT>
type InitialStateT = {
    messagesData: MessageDataT
    dialogsData: DialogsDataT
    newMessageText: string
}

let initialState: InitialStateT = {
    messagesData: [
        { id: 1, content: "Hi", myMessage: true },
        { id: 2, content: "how is the dude himself? =))", myMessage: true },
        { id: 3, content: "Hi dude, what's new? 0_0", myMessage: false },
        { id: 4, content: "Where is my donut?", myMessage: false },
        { id: 5, content: "Did you looked at Naruto?", myMessage: false },
        { id: 6, content: "I like cars", myMessage: true },
        { id: 7, content: "You need JOJO anime", myMessage: false },
    ],
    dialogsData: [
        { id: 1, name: "Andrey" },
        { id: 2, name: "Viktor" },
        { id: 3, name: "Stepan" },
        { id: 4, name: "Viktoria" },
        { id: 5, name: "Tolik" },
    ],
    newMessageText: ""
}

let dialogsReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case ADD_MESSAGE:
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
//ActionCreatorType
type ActionT = AddMessageActionT
type AddMessageActionT = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
}
//ActionCreator
export const addMessage = (newMessageText: string): AddMessageActionT => ({ type: ADD_MESSAGE, newMessageText })

export default dialogsReducer;
