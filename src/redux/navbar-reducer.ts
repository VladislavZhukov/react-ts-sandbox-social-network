//TYPES
import { BestFriendsT } from "../types/types";

let initialState = {
  friends: [
    { id: 1, name: "Viktor" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Jojo" },
  ] as Array<BestFriendsT>,
}

type InitialStateT = typeof initialState

const navBarReducer = (state = initialState, action: any): InitialStateT => {
  return state
}

export default navBarReducer
