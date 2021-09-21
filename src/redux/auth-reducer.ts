//CORE
import { Dispatch } from "redux"
import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
//TYPES
import { AppStateT } from "./store-redux"
//API
import { authAPI, ResultCodeE, ResultCodeForCaptchaE, securityApi } from "../api/api"

const SET_USER_DATA = "sandbox_network/auth/SET_USER_DATA"
const SET_CAPTCHA_URL_SUCCESS = "sandbox_network/auth/SET_CAPTCHA_URL_SUCCESS"

type InitialStateT = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

let initialState: InitialStateT = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

let authReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
//ActionCreatorType
type ActionT = SetAuthUserDataActionT | SetCaptchaUrlSuccessActionT
type SetAuthUserDataActionPayloadT = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionT = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadT
}
type SetCaptchaUrlSuccessActionT = {
    type: typeof SET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string | null }
}
//ActionCreator
export const setAuthUserData = (userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean): SetAuthUserDataActionT => ({
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    })
export const setCaptchaUrlSuccess = (captchaUrl: string | null): SetCaptchaUrlSuccessActionT => ({
    type: SET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
})
//ThunkCreatorType
type ThunkT = ThunkAction<Promise<void>, AppStateT, unknown, ActionT | ReturnType<typeof stopSubmit>>
//ThunkCreator
export const getAuthUserData = (): ThunkT => async (dispatch) => {
    const response = await authAPI.auth();
    if (response.resultCode === ResultCodeE.Success) {
        let auth = response.data;
        dispatch(setAuthUserData(auth.id, auth.email, auth.login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkT  => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeE.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeForCaptchaE.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let errorMessage = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit("login",{ _error: errorMessage }))
    }
}
export const logout = (): ThunkT => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkT => async (dispatch) => {
    const response = await securityApi.getCaptchaUrl()
    dispatch(setCaptchaUrlSuccess(response.data.url))
}

export default authReducer
