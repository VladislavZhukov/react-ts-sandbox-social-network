//CORE
import { FC } from "react"
//TYPES
import { FriendType } from "../../types/types"
//my libs
import Friend from "./Friend"
import Pagination from "../Common/Pagination/Pagination"

type PropsT = {
  pageSize?: number
  currentPage: number
  friendsData: Array<FriendType>
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
          totalFriendsCount={totalFriendsCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          pageSize={pageSize}
        />
      </div>
      {friendsData.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          id={f.id}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
        />
      ))}
    </div>
  );
};

export default Friends;
