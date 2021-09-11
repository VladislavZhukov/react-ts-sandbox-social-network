//CORE
import { FC } from "react";
//STYLES
import pm from "./Pagination.module.css";
//other lib
import ReactPagination from "react-js-pagination";

type PropsT = {
  pageSize?: number,
  currentPage: number,
  totalFriendsCount: number,
  onPageChanged: (pageNumber: number) => void
}

let Pagination: FC<PropsT> = ({ currentPage, totalFriendsCount, pageSize, onPageChanged }) => {
  let handlePageChange = (pageNumber: number) => {
    onPageChanged(pageNumber);
  };

  return (
    <div className={pm.reactPagination}>
      <ReactPagination
        activePage={currentPage}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalFriendsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange.bind(this)}
      />
    </div>
  );
};

export default Pagination;
