import { ResultCodeE, APIResponseT } from './../api/api';
import { friendsAPI } from "../api/friends-api"
import { follow, unfollow } from "./friends-reducer"

jest.mock("../api/friends-api")
const friendsAPIMock = friendsAPI as jest.Mocked<typeof friendsAPI>

const dispatchMonk = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMonk.mockClear()
    getStateMock.mockClear()
    friendsAPIMock.follow.mockClear()
    friendsAPIMock.unfollow.mockClear()
})

const result: APIResponseT = {
    resultCode: ResultCodeE.Success,
    messages: [],
    data: {}
}

friendsAPIMock.follow.mockReturnValue(Promise.resolve(result))
friendsAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

//TODO understand why friendsAPI.friendsAPI comes to the follow function and solve this problem
test("Success follow thunk", async () => {
    const thunk = follow(1)

    await thunk(dispatchMonk, getStateMock, {})

    expect(dispatchMonk).toBeCalledTimes(3)
    // expect(dispatchMonk).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    // expect(dispatchMonk).toHaveBeenCalledWith(2, actions.followSuccess(1))
    // expect(dispatchMonk).toHaveBeenCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

test("Success unfollow thunk", async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMonk, getStateMock, {})

    expect(dispatchMonk).toBeCalledTimes(3)
    // expect(dispatchMonk).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    // expect(dispatchMonk).toHaveBeenCalledWith(2, actions.followSuccess(1))
    // expect(dispatchMonk).toHaveBeenCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

