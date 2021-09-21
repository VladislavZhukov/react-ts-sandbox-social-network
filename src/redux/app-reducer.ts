//CORE
import { ThunkAction } from "redux-thunk"
//TYPE
import { AppStateT } from "./store-redux"
//other reducer
import { getAuthUserData } from "./auth-reducer"

const SET_INITIALIZED_SUCCESS = "sandbox_network/app/SET_INITIALIZED_SUCCESS"

type InitialStateT = {
    initialized: boolean
}

let initialState: InitialStateT = {
    initialized: false
}

let appReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
//ActionCreatorType
type ActionT = SetInitializedSuccessActionT
type SetInitializedSuccessActionT = {
    type: typeof SET_INITIALIZED_SUCCESS
}
//ActionCreator
export const setInitializedSuccess = (): SetInitializedSuccessActionT => ({
    type: SET_INITIALIZED_SUCCESS
})
//ThunkCreatorType
type ThunkT = ThunkAction<Promise<void>, AppStateT, unknown, ActionT>
//ThunkCreator
export const initializeApp = (): ThunkT => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(setInitializedSuccess())
}

export default appReducer
