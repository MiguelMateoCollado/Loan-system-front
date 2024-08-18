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
  usersAtom,
  refreshUserAtom,
} from "../atoms/usersAtom";
import MoneyFormater from "../resources/MoneyFormater";
import { currentPageAtom } from "../atoms/paginationAtom";
export const TableContent = ({ children, url }) => {
  const { setDeleteUser, deleteUser } = useContext(clientCreatorContext);
  const { buttonInputs } = useOptionButtons();
  let [loading] = useAtom(loadingAtom);
  const [users] = useAtom(usersAtom);
  const handleDelete = useSetAtom(onDeleteUserAtom);
  const handleCharge = useSetAtom(refreshUserAtom);
  const onChangePage = useSetAtom(onChangePageAtom);
  const currentPage = useAtomValue(currentPageAtom);
  useEffect(() => {
    handleCharge();
  }, []);

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
            <Link
              href={"/clients/create"}
              className="btn btn-primary rounded-md self-end w-fit my-2"
            >
              Crear nuevo cliente
            </Link>
            
            <SearchInput />
          </div>
          <table className="table-zebra table table-compact w-full">
            {children}
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Correo Electronico</th>
                <th>Cedula</th>
                <th>Ingresos mensuales</th>
                <th>Gastos mensuales</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.users?.map((user) => (
                <tr key={user.id} className="overflow-auto">
                  <td>
                    <div
                      style={{
                        backgroundImage: `url('http://localhost:3001/${user.image}')`,
                      }}
                      className={`w-20 h-20 rounded-full bg-cover bg-center justify-center bg-yellow-700 col-span-1 items-center flex  overflow-hidden`}
                    ></div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.DNI}</td>
                  <td>
                    {MoneyFormater.from(user.monthly_income, { symbol: "$" })}
                  </td>
                  <td>
                    {MoneyFormater.from(user.monthly_expenses, { symbol: "$" })}
                  </td>
                  <td className="gap-2 text-2xl">
                    <div className="flex gap-3 justify-center">
                      {buttonInputs.map(
                        ({ buttonStyle, icon, method }, index) => {
                          return (
                            <ButtonRebirded
                              key={index}
                              onClick={() => method(user)}
                              className={buttonStyle}
                            >
                              {icon}
                            </ButtonRebirded>
                          );
                        }
                      )}
                    </div>
                  </td>
                  <td
                    className={`${deleteUser == false ? "hidden" : "block"} `}
                  >
                    {deleteUser && (
                      <Sign
                        icon={
                          <Icon
                            className="text-yellow-600 text-7xl "
                            icon="ri:question-line"
                          />
                        }
                        message={"Seguro que quieres eliminar este usuario"}
                      >
                        <ButtonRebirded onClick={() => setDeleteUser(false)}>
                          No
                        </ButtonRebirded>

                        <ButtonRebirded
                          onClick={() => {
                            setDeleteUser(false);
                            handleCharge();
                            handleDelete();
                          }}
                        >
                          Si
                        </ButtonRebirded>
                      </Sign>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      )}
    </div>
  );
};
