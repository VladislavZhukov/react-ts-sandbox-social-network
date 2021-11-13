//CORE
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
//my reducers
import appReducer from "./app-reducer"
import chatReducer from "./chat-reducer"
import authReducer from "./auth-reducer"
import navBarReducer from "./navbar-reducer"
import dialogsReducer from "./dialogs-reducer"
import friendsReducer from "./friends-reducer"
import profileReducer from "./profile-reducer"


let rootReducers = combineReducers({
    app: appReducer,
    chat: chatReducer,
    auth: authReducer,
    form: formReducer,
    navBar: navBarReducer,
    postsPage: profileReducer,
    dialogPage: dialogsReducer,
    friendsPage: friendsReducer
});

type RootReducerT = typeof rootReducers
export type AppStateT = ReturnType<RootReducerT>

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateT, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.___store___ = store

export default store
