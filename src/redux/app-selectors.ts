//TYPES
import { AppStateT } from "./store-redux"

export const getInitialized = (state: AppStateT) => { return state.app.initialized }