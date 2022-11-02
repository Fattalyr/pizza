import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setPage } from "../../Redux/filterSlice";
import style from "./Pagination.module.scss";

type PaginationProps = {
  countPizzas: number
}

const Pagination: React.FC<PaginationProps> = ({ countPizzas }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setPage(e.selected))}
        pageRangeDisplayed={8}
        pageCount={Math.ceil(countPizzas / 8)}
        previousLabel="<"
      />
    </div>
  );
}

export default Pagination;
