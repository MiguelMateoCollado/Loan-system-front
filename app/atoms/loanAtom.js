import { atom } from "jotai";
import { currentPageAtom } from "./paginationAtom";
import axios from "axios";
export const payment_methodAtom = atom("");
export const type_of_paymentAtom = atom("");
export const loansAtom = atom("");

const refreshLoansAtom = atom(null, async (get, set) => {
  let response = await axios.get(
    `http://localhost:3001/loans?page=${get(currentPageAtom)}`
  );
  set(loansAtom, response.data);
});

const searchLoanAtom = atom(null, async (get, set, update) => {
  set(currentPageAtom, 1);
  let currentPage = get(currentPageAtom);
  let response = await axios.get(
    `http://localhost:3001/loans/search/${update}?page=${currentPage}`
  );
  if (response.message !== undefined) {
    console.log(response.message);
  }
  console.log(response.data);
  set(usersAtom, response.data);
});

export { searchLoanAtom, refreshLoansAtom };
