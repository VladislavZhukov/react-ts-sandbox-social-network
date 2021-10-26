//CORE
import { FC, memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//REDUX
import { FilterSearchT, getFriends } from "../../redux/friends-reducer"
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

let Friends: FC<PropsT> = memo(() => {
  const filter = useSelector(getFriendsFilter)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const friendsData = useSelector(getAllFriendsData)
  const totalFriendsCount = useSelector(getTotalFriendsCount)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFriends(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getFriends(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterSearchT) => {
    dispatch(getFriends(1, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
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
          follow={follow}
          unfollow={unfollow}
        />
      ))}
    </div>
  )
})

export default Friends

type PropsT = {}
