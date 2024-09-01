"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useContext } from "react";
import clientCreatorContext from "../context/clientCreatorContext";
import { Icon } from "@iconify/react";
import useOptionButtons from "../resources/useOptionButtons";
import ButtonRebirded from "../components/ButtonRebirded";
import ReactLoading from "react-loading";
import Sign from "./Sign";
import SearchInput from "../components/SearchInput";
import { Pagination } from "./Pagination";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import loadingAtom from "../atoms/loadingAtom";
import {
  onDeleteUserAtom,
  onChangePageAtom,
  refreshUserAtom,
} from "../atoms/usersAtom";
import MoneyFormater from "../resources/MoneyFormater";
import { currentPageAtom } from "../atoms/paginationAtom";
export const TableContent = ({ children, data, head }) => {
  const { setDeleteUser, deleteUser } = useContext(clientCreatorContext);
  let [loading] = useAtom(loadingAtom);
  const handleDelete = useSetAtom(onDeleteUserAtom);
  const onChangePage = useSetAtom(onChangePageAtom);
  const currentPage = useAtomValue(currentPageAtom);
  useEffect(() => {
    onChangePage();
  }, [currentPage]);
  return (
    <div className="flex flex-wrap justify-center items-center w-full">
      {!loading === false ? (
        <ReactLoading type="bars" color="red" />
      ) : (
        <div className="w-11/12 flex justify-end flex-col">
          <div className=" flex justify-between">
            {children}
            <SearchInput />
          </div>
          <table className="table-zebra table table-compact w-full">
            <thead>{head}</thead>
            <tbody>{data}</tbody>
          </table>
          
        </div>
      )}
    </div>
  );
};
