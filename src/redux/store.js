import dialogsReducer from "./dialogs-reducer";
import navBarReducer from "./navbar-reducer.ts";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    postsPage: {
      postsData: [
        { id: 1, message: "JOJO like PlayStation XD", likeCounter: 10 },
        { id: 2, message: "I need apple", likeCounter: 20 },
      ],
      newPostText: "",
    },
    dialogPage: {
      messagesData: [
        { id: 1, content: "Hi", myMessage: true },
        { id: 2, content: "how is the dude himself? =))", myMessage: true },
        { id: 3, content: "Hi dude, what's new? 0_0", myMessage: false },
        { id: 4, content: "Where is my donut?", myMessage: false },
        { id: 5, content: "Did you looked at Naruto?", myMessage: false },
        { id: 6, content: "I like cars", myMessage: true },
        { id: 7, content: "You need JOJO anime", myMessage: false },
      ],
      dialogsData: [
        { id: 1, name: "Andrey" },
        { id: 2, name: "Viktor" },
        { id: 3, name: "Stepan" },
        { id: 4, name: "Viktoria" },
        { id: 5, name: "Tolik" },
      ],
      newMessageText: "",
    },
    navBar: {
      friends: [
        { id: 1, name: "Viktor" },
        { id: 2, name: "Sveta" },
        { id: 3, name: "Jojo" },
      ],
    },
  },
  _callSubscriber(state) {},

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
    this._state.postsPage = profileReducer(this._state.postsPage, action);
    this._state.navBar =navBarReducer(this._state.navBar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
