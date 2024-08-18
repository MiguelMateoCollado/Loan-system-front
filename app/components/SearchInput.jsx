import React from "react";
import { Icon } from "@iconify/react";
import { useSetAtom, useAtom } from "jotai";
import {
  searchUserAtom,
  searchAtom,
  refreshUserAtom,
} from "../atoms/usersAtom";
const SearchInput = () => {
  const handleSearch = useSetAtom(searchUserAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const refreshUsers = useSetAtom(refreshUserAtom);
  const onSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      refreshUsers();
    } else {
      handleSearch(search);
    }
  };
  return (
    <div className="flex items-center ">
      <button
        type="submit"
        onClick={() => {
          refreshUsers();
          setSearch("");
        }}
        className="p-2 mx-2 rounded-lg bg-gray-300 text-2xl text-gray-500 "
      >
        <Icon icon="system-uicons:reset" />
      </button>
      <form className="flex relative " onSubmit={(e) => onSubmit(e)}>
        <input
          className="input rounded-md"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
        <button
          type="submit"
          className="absolute right-3 top-2 text-2xl text-gray-500 "
        >
          <Icon className="hover:text-blue-600" icon="ic:sharp-search" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
