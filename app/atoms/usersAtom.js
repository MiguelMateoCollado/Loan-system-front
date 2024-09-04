import { atom } from "jotai";
import { currentPageAtom, pagesAtom } from "./paginationAtom";
import axios from "axios";

const usersAtom = atom([]);
const userAtom = atom({});
const searchAtom = atom("");
const refreshUserAtom = atom(null, async (get, set) => {
  let response = await axios.get(
    `http://localhost:3001/users/${get(currentPageAtom)}`
  );
  set(usersAtom, response.data);
});

const getUserAtom = atom(null, async (get, set, update) => {
  let users = get(usersAtom);
  set(userAtom, await users.users.filter((user) => user.id === update)[0]);
});
const userEmailAtom = atom("");

const onChangePageAtom = atom(null, async (get, set, update) => {
  if (update) {
    set(currentPageAtom, update);
  }
  let response = await axios.get(
    `http://localhost:3001/users/${get(currentPageAtom)}`
  );
  set(usersAtom, response.data);
});

const onDeleteUserAtom = atom(null, async (get, set) => {
  let users = get(usersAtom);
  let userEmail = get(userEmailAtom);
  let pages = get(pagesAtom);
  set(currentPageAtom, pages);
  await axios.delete(`http://localhost:3001/users/${userEmail}`);
  let newSet = users.users.filter((user) => user.email !== userEmail);
  set(usersAtom, { ...users, users: newSet });
});

const searchUserAtom = atom(null, async (get, set, update) => {
  set(currentPageAtom, 1);
  let currentPage = get(currentPageAtom);
  let response = await axios.get(
    `http://localhost:3001/users/user/${update}?page=${currentPage}`
  );
  if (response.message !== undefined) {
    console.log(response.message);
  }
  console.log(response.data);
  set(usersAtom, response.data);
});

export {
  searchAtom,
  searchUserAtom,
  onChangePageAtom,
  usersAtom,
  refreshUserAtom,
  userAtom,
  getUserAtom,
  onDeleteUserAtom,
  userEmailAtom,
};
