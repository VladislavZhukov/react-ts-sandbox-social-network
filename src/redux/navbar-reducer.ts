//TYPES
import { BestFriendsT } from "../types/types";

let initialState = {
  friends: [
    { id: 1, name: "Viktor" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Jojo" },
  ] as Array<BestFriendsT>,
}

const navBarReducer = (state = initialState): InitialStateT => {
  return state
}

export default navBarReducer

type InitialStateT = typeof initialState
