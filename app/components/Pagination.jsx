"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
const itemsPerPage = 10; // Número de ítems por página

export const Pagination = () => {
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  const [currentPage, setCurrentPage] = useState(1);
  // Calcula los índices de los ítems a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    if (pageNumber <= totalPages && pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  };
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Si hay pocas páginas, muestra todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Muestra páginas alrededor de la página actual
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(
        totalPages,
        currentPage + Math.floor(maxPagesToShow / 2)
      );

      // Ajusta el rango de la página inicial si hay suficiente espacio
      if (endPage - startPage + 1 < maxPagesToShow) {
        if (currentPage <= Math.floor(maxPagesToShow / 2)) {
          endPage = Math.min(maxPagesToShow, totalPages);
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
          startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
        }
      }

      // Añade los números de página a la lista
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Añade los puntos suspensivos si hay páginas omitidas
      if (startPage > 1) {
        pageNumbers.unshift("...");
      }
      if (endPage < totalPages) {
        pageNumbers.push("...");
      }
    }

    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers();
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
