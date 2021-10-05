//TYPE
import { InferActionsType } from "./store-redux"
import { BaseThunkType } from './store-redux'
//other reducer
import { getAuthUserData } from "./auth-reducer"

let initialState = {
    initialized: false
}

let appReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case "SN/APP/SET_INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
//ActionCreator
export const actions = {
    setInitializedSuccess: () => ({ type: "SN/APP/SET_INITIALIZED_SUCCESS" } as const)
}
//ThunkCreator
export const initializeApp = (): ThunkT => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(actions.setInitializedSuccess())
}

export default appReducer

type InitialStateT = typeof initialState
type ActionT = InferActionsType<typeof actions>
type ThunkT = BaseThunkType<ActionT>
