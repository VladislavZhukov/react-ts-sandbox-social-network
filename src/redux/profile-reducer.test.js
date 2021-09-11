import profileReducer, { addPost, deletePost } from './profile-reducer';

let state = {
    postsData: [
        { id: 1, message: "JOJO like PlayStation XD", likeCounter: 10 },
        { id: 2, message: "I need read apple", likeCounter: 20 },
        { id: 3, message: "I need green apple", likeCounter: 30 },
    ]
};

test('length of posts should be incremented', () => {
    //1. test data
    let action = addPost("new post test 1");
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.postsData.length).toBe(4);
});

test('message of new posts should be correct', () => {
    let action = addPost("new post test 1");
    let newState = profileReducer(state, action);

    expect(newState.postsData[3].message).toBe("new post test 1");
});

test('like counter of new posts should be 0', () => {
    let action = addPost("new post test 1");
    let newState = profileReducer(state, action);

    expect(newState.postsData[3].likeCounter).toBe(0);
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(2);
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(2);
});

test('after deleting length should`t be decrement if id is incorrect', () => {
    let action = deletePost(2222);
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(3);
});
