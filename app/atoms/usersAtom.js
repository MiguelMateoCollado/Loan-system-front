import { atom } from "jotai";
import { currentPageAtom, pagesAtom } from "./paginationAtom";
import axios from "axios";
const usersAtom = atom(async (get, { signal }) => {
  let response = await axios.get(
    `http://localhost:3001/users/${get(currentPageAtom)}`
  );
  return response.data;
});

export { usersAtom };
