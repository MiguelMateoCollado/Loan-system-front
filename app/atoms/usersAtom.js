import { atom, useAtom } from "jotai";
import { currentPageAtom, pagesAtom } from "./paginationAtom";
import axios from "axios";
const usersAtom = atom([]);

const refreshUserAtom = atom(null, async (get, set) => {
  let response = await axios.get(
    `http://localhost:3001/users/${get(currentPageAtom)}`
  );
  set(usersAtom, response.data);
});
const userAtom = atom({});
const getUserAtom = atom(null, async (get, set, update) => {
  let users = await get(usersAtom);

  set(
    userAtom,
    users.users.filter((user) => user.id === update)[0]
  );
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
const onDeleteUserAtom = atom(null, async (get, set, update) => {
  let users = get(usersAtom);
  let userEmail = get(userEmailAtom);
  let pages = get(pagesAtom);
  set(currentPageAtom, pages);
  await axios.delete(`http://localhost:3001/users/${userEmail}`);
  let newSet = users.users.filter((user) => user.email !== userEmail);
  set(usersAtom, { ...users, users: newSet });
});

export {
  onChangePageAtom,
  usersAtom,
  refreshUserAtom,
  userAtom,
  getUserAtom,
  onDeleteUserAtom,
  userEmailAtom,
};
