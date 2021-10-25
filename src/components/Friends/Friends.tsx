//CORE
import { FC, memo } from "react"
//TYPES
import { FriendT } from "../../types/types"
//COMPONENT
import Friend from "./Friend"
import FriendsSearchForm from "./FriendsSearchForm/FriendsSearchForm"
//my libs
import Pagination from "../Common/Pagination/Pagination"
import { FilterSearchT } from "../../redux/friends-reducer"

let Friends: FC<PropsT> = memo(({
  pageSize,
  currentPage,
  friendsData,
  totalFriendsCount,
  followingInProgress,
  follow,
  unfollow,
  onPageChanged,
  onFilterChanged
}) => {
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

type PropsT = {
  pageSize?: number
  currentPage: number
  friendsData: Array<FriendT>
  totalFriendsCount: number
  followingInProgress: Array<number>

  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
  onFilterChanged: (filter: FilterSearchT) => void
}
