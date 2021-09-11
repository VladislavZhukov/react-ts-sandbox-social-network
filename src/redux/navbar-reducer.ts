type FriendsType = {
  id: number,
  name: string
}

let initialState = {
  friends: [
    { id: 1, name: "Viktor" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Jojo" },
  ] as Array<FriendsType>,
};

type InitialStateType = typeof initialState

const navBarReducer = (state = initialState, action: any): InitialStateType => {
  return state;
};

export default navBarReducer;
