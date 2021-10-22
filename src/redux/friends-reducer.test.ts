import friendsReducer, { actions, InitialStateT } from "./friends-reducer"

let state: InitialStateT
beforeEach(() => {
    state = {
        friendsData: [
            {
                id: 0,
                name: 'John 0',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: 'status 0'
            }, {
                id: 1,
                name: 'John 1',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: 'status 1'
            }, {
                id: 2,
                name: 'John 2',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: 'status 2'
            }, {
                id: 3,
                name: 'John 3',
                followed: true,
                photos: {
                    large: null,
                    small: null
                },
                status: 'status 3'
            }, {
                id: 4,
                name: 'John 4',
                followed: true,
                photos: {
                    large: null,
                    small: null
                },
                status: 'status 4'
            }
        ],
        pageSize: 10,
        totalFriendsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test("follow success", () => {
    const newState = friendsReducer(state, actions.followSuccess(1))

    expect(newState.friendsData[0].followed).toBeFalsy()
    expect(newState.friendsData[1].followed).toBeTruthy()
})

test("unfollow success", () => {
    const newState = friendsReducer(state, actions.unFollowSuccess(3))

    expect(newState.friendsData[4].followed).toBeTruthy()
    expect(newState.friendsData[3].followed).toBeFalsy()
})