//CORE
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
//my reducers
import appReducer from "./app-reducer"
import authReducer from "./auth-reducer"
import navBarReducer from "./navbar-reducer"
import dialogsReducer from "./dialogs-reducer"
import friendsReducer from "./friends-reducer"
import profileReducer from "./profile-reducer"

let rootReducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    form: formReducer,
    navBar: navBarReducer,
    postsPage: profileReducer,
    dialogPage: dialogsReducer,
    friendsPage: friendsReducer
});

type RootReducerT = typeof rootReducers
export type AppStateT = ReturnType<RootReducerT>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.___store___ = store

export default store
