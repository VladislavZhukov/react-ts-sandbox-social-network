//TYPES
import { AppStateT } from "./store-redux"

export const selectIsAuth = (state: AppStateT) => { return state.auth.isAuth }
export const selectLogin = (state: AppStateT) => { return state.auth.login }