//CORE
import { FC, memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import queryString from "query-string"
//REDUX
import { FilterSearchT, follow, getFriends, unfollow } from "../../redux/friends-reducer"
//COMPONENT
import Friend from "./Friend"
import FriendsSearchForm from "./FriendsSearchForm/FriendsSearchForm"
//SELECTORS
import {
  getAllFriendsData,
  getCurrentPage,
  getPageSize,
  getTotalFriendsCount,
  getFollowingInProgress,
  getFriendsFilter
} from "../../redux/friends-selectors"
//my libs
import Pagination from "../Common/Pagination/Pagination"


let Friends: FC = memo(() => {
  const filter = useSelector(getFriendsFilter)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const friendsData = useSelector(getAllFriendsData)
  const totalFriendsCount = useSelector(getTotalFriendsCount)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const parsed = queryString.parse(location.search) as QueryT

    let actualCurrentPage = currentPage
    let actualFilter = filter

    if (!!parsed.currentPage) actualCurrentPage = Number(parsed.currentPage)
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }

    dispatch(getFriends(actualCurrentPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryT = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.currentPage = String(currentPage)

    const _pathname = `/friends`
    const _search = `?${queryString.stringify(query)}`

    if (location.search !== _search) {
      history.push({
        pathname: _pathname,
        search: _search
      })
    }
  }, [location.search, history, filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getFriends(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterSearchT) => {
    dispatch(getFriends(1, pageSize, filter))
  }
  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }
  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <div>
        <FriendsSearchForm onFilterChanged={onFilterChanged} />
      </div>
      <div>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalFriendsCount={totalFriendsCount}
          onPageChanged={onPageChanged}
        />
      </div>
      {friendsData.map((f) => (
        <Friend
          id={f.id}
          key={f.id}
          friend={f}
          followingInProgress={followingInProgress}
          follow={onFollow}
          unfollow={onUnfollow}
        />
      ))}
    </div>
  )

  type QueryT = {
    term?: string
    friend?: string
    currentPage?: string
  }
})

export default Friends