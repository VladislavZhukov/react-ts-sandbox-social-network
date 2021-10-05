//CORE
import { FormAction, stopSubmit } from "redux-form"
//TYPES
import { BaseThunkType, InferActionsType } from "./store-redux"
//API
import { ResultCodeE, ResultCodeForCaptchaE } from "../api/api"
import { authAPI } from "../api/auth-api"
import { securityApi } from "../api/security-api"

let initialState = {
    userId: null as (number | null),
    email: null as (string | null),
    login: null as (string | null),
    isAuth: false,
    captchaUrl: null as (string | null),
}

let authReducer = (state = initialState, action: ActionT): InitialStateT => {
    switch (action.type) {
        case "SN/AUTH/SET_USER_DATA":
        case "SN/AUTH/SET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
//ActionCreator
export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: "SN/AUTH/SET_USER_DATA", payload: { userId, email, login, isAuth } } as const),
    setCaptchaUrlSuccess: (captchaUrl: string | null) => ({ type: "SN/AUTH/SET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl } } as const)
}
//ThunkCreator
export const getAuthUserData = (): ThunkT => async (dispatch) => {
    const response = await authAPI.auth();
    if (response.resultCode === ResultCodeE.Success) {
        let auth = response.data;
        dispatch(actions.setAuthUserData(auth.id, auth.email, auth.login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkT => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeE.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeForCaptchaE.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let errorMessage = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: errorMessage }))
    }
}
export const logout = (): ThunkT => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkT => async (dispatch) => {
    const response = await securityApi.getCaptchaUrl()
    dispatch(actions.setCaptchaUrlSuccess(response.url))
}

export default authReducer

type InitialStateT = typeof initialState
type ActionT = InferActionsType<typeof actions>
type ThunkT = BaseThunkType<ActionT | FormAction>
