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
        className="p-2 mx-2 rounded-lg bg-black text-2xl text-white hover:bg-black/90 "
      >
        <Icon icon="system-uicons:reset" />
      </button>
      <form className="flex relative " onSubmit={(e) => onSubmit(e)}>
        <div className="input rounded-full w-[15rem] flex items-center p-0  border-black bg-black ">
          <input
            className=" h-full input   rounded-full w-5/6 p-3 focus:ring-offset-0 focus:border-0"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </div>
        <button
          type="submit"
          className="absolute right-3 top-2 text-2xl text-white "
        >
          <Icon className="hover:gray-500" icon="ic:sharp-search" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
