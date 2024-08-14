"use client";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  generatePageNumbersAtom,
  currentPageAtom,
  handleChangePageAtom,
} from "../atoms/paginationAtom";
export const Pagination = () => {
  const [currentPage] = useAtom(currentPageAtom);
  const pageNumbers = useAtomValue(generatePageNumbersAtom);
  const [, handlePageChange] = useAtom(handleChangePageAtom);

  useEffect(() => {}, [currentPage]);
  return (
    <div className="my-5">
      <div className="flex gap-x-1 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-400 px-4 p-2 text-white rounded-md"
        >
          <Icon icon="ri:arrow-left-s-line" />
        </button>
        {pageNumbers?.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={index}
              className="px-4 p-2 bg-gray-200  font-bold rounded-md"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={
                pageNumber === currentPage
                  ? "bg-black px-4 p-2 text-white rounded-md"
                  : "bg-gray-400 px-4 p-2 text-white rounded-md"
              }
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-400 px-4 p-2 text-white rounded-md"
        >
          <Icon icon="ri:arrow-right-s-line" />
        </button>
      </div>
    </div>
  );
};
