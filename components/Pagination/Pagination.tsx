// components/Pagination/Pagination.tsx

"use client";

import ReactPaginate from "react-paginate";

import css from "@/components/Pagination/Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  forcePage,
}: PaginationProps) {
  if (!pageCount || pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="< prev"
      containerClassName={css.container}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      forcePage={forcePage}
    />
  );
}
