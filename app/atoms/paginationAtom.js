import { atom } from "jotai";
import { usersAtom } from "./usersAtom";
import { loansAtom } from "./loanAtom";
const currentPageAtom = atom(1);
const pagesAtom = atom(0);

const refreshPagesAtom = atom(null, async (get, set, update) => {
  if (update === "loans") {
    let pages = get(loansAtom);
    set(pagesAtom, pages.totalPages);
  }
  if (update === "users") {
    let pages = get(usersAtom);
    set(pagesAtom, pages.totalPages);
  }
});

const generatePageNumbersAtom = atom(async (get) => {
  let pages = await get(pagesAtom);
  let currentPage = get(currentPageAtom);
  const pageNumbers = [];
  const maxPagesToShow = 5;
  if (pages <= maxPagesToShow) {
    // Si hay pocas páginas, muestra todas
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Muestra páginas alrededor de la página actual
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pages, currentPage + Math.floor(maxPagesToShow / 2));

    // Ajusta el rango de la página inicial si hay suficiente espacio
    if (endPage - startPage + 1 < maxPagesToShow) {
      if (currentPage <= Math.floor(maxPagesToShow / 2)) {
        endPage = Math.min(maxPagesToShow, pages);
      } else if (currentPage + Math.floor(maxPagesToShow / 2) >= pages) {
        startPage = Math.max(pages - maxPagesToShow + 1, 1);
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
    if (endPage < pages) {
      pageNumbers.push("...");
    }
  }
  return pageNumbers;
});

const handleChangePageAtom = atom(null, async (get, set, update) => {
  let pages = await get(pagesAtom);
  if (update > 0 && update <= pages) {
    set(currentPageAtom, () => {
      return update;
    });
  }
});

export {
  currentPageAtom,
  pagesAtom,
  handleChangePageAtom,
  generatePageNumbersAtom,
  refreshPagesAtom,
};
