import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED_SUCCESS = "sandbox_network/app/SET_INITIALIZED_SUCCESS";

type InitialStateType = {
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false
};

let appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

type SetInitializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS
}

//ActionCreator
export const setInitializedSuccess = (): SetInitializedSuccessActionType => ({
    type: SET_INITIALIZED_SUCCESS
});
//ThunkCreator
export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    await Promise.all([promise]);
    dispatch(setInitializedSuccess());
};


export default appReducer;
