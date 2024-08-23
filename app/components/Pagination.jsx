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
          className=" text-black pr-4 p-2 rounded-md flex "
        >
          <Icon icon="ri:arrow-left-s-line" className="my-auto" />{" "}
          <span className="tracking-widest text-center">PREV</span>
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
                  ? "bg-black font-bold px-4 p-2 text-white rounded-full"
                  : "px-4 p-2 text-black font-bold rounded-full"
              }
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className=" text-black px-4 p-2 rounded-md flex "
        >
          <span className="tracking-widest text-center">NEXT</span>
          <Icon icon="ri:arrow-right-s-line" className="my-auto" />
        </button>
      </div>
    </div>
  );
};
