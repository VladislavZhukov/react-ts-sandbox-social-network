//CORE
import { FC } from "react"
//TYPES
import { FriendT } from "../../types/types"
//COMPONENT
import Friend from "./Friend"
//my libs
import Pagination from "../Common/Pagination/Pagination"

type PropsT = {
  pageSize?: number
  currentPage: number
  friendsData: Array<FriendT>
  totalFriendsCount: number
  followingInProgress: Array<number>

  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
}

let Friends: FC<PropsT> = ({
  pageSize,
  currentPage,
  friendsData,
  totalFriendsCount,
  followingInProgress,
  follow,
  unfollow,
  onPageChanged,
}) => {
  return (
    <div>
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
}

export default Friends
