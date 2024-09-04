"use client";
import React from "react";
import { TableContent } from "../components/TableContent";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { usersAtom } from "../atoms/usersAtom";
import { refreshUserAtom } from "../atoms/usersAtom";
import Link from "next/link";
import { Pagination } from "../components/Pagination";
import useOptionButtons from "../resources/useOptionButtons";
import ButtonRebirded from "../components/ButtonRebirded";
import clientCreatorContext from "../context/clientCreatorContext";
import { useContext, useEffect } from "react";
import TextMoney from "../components/textMoney";
import { currentPageAtom } from "../atoms/paginationAtom";
import { refreshPagesAtom } from "../atoms/paginationAtom";
const page = () => {
  const { setDeleteUser, deleteUser } = useContext(clientCreatorContext);
  const onChargePage = useSetAtom(refreshPagesAtom);
  const { buttonInputs } = useOptionButtons();
  const [users] = useAtom(usersAtom);
  const handleCharge = useSetAtom(refreshUserAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  useEffect(() => {
    handleCharge();
  }, []);

  useEffect(() => {
    onChargePage("users");
    setCurrentPage(1)
  }, []);
  return (
    <div className="gap-3 col-span-10 p-10">
      <TableContent
        data={users.users?.map((user, index) => {
          return (
            <tr key={index} className="overflow-auto">
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
                <TextMoney>{user.monthly_income}</TextMoney>
              </td>
              <td>
                <TextMoney>{user.monthly_expenses}</TextMoney>
              </td>
              <td className="gap-2 text-2xl">
                <div className="flex gap-3 justify-center">
                  {buttonInputs.map(({ buttonStyle, icon, method }, index) => {
                    return (
                      <ButtonRebirded
                        key={index}
                        onClick={() => method(user)}
                        className={buttonStyle}
                      >
                        {icon}
                      </ButtonRebirded>
                    );
                  })}
                </div>
              </td>
              <td className={`${deleteUser == false ? "hidden" : "block"} `}>
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
          );
        })}
      >
        <Link
          href={"/clients/create"}
          className="btn bg-black text-white hover:bg-black/90 rounded-md self-end w-fit my-2"
        >
          Crear nuevo cliente
        </Link>
      </TableContent>
      <Pagination type={"users"} />
    </div>
  );
};

export default page;
