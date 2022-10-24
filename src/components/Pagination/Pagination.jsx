import React from "react";
import ReactPaginate from "react-paginate";

import style from "./Pagination.module.scss";

function Pagination({ pizzasCount, setOnPage }) {
  return (
    <div>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setOnPage(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={Math.ceil(pizzasCount / 8)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;
