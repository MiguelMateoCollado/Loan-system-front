"use client";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import clientCreatorContext from "../context/clientCreatorContext";
export const Pagination = () => {
  const { currentPage, setCurrentPage, pageNumbers } =
    useContext(clientCreatorContext);
  const handlePageChange = (pageNumber) => {
    if (pageNumber <= pageNumbers.length  && pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="my-5">
      <div className="flex gap-x-1 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-400 px-4 p-2 text-white rounded-md"
        >
          <Icon icon="ri:arrow-left-s-line" />
        </button>
        {pageNumbers.map((pageNumber, index) =>
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
