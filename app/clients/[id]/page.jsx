"use client";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import Link from "next/link";
import { useAtom, useSetAtom } from "jotai";
import { userAtom, getUserAtom } from "@/app/atoms/usersAtom";
import { LoanTable } from "@/app/components/LoanTable";
const page = ({ params }) => {
  const { id } = params;
  const getUser = useSetAtom(getUserAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    setUser(getUser(id));
  }, []);
  return (
    <div className="col-span-9 p-5 gap-x-2 grid grid-cols-5">
      <div className="col-span-4 flex gap-x-3 h-fit">
        <Link
          href="/clients"
          className="p-3 bg-black rounded-md text-white text-lg"
        >
          <Icon icon="fe:arrow-left" />
        </Link>
      </div>
      <div className="col-span-2">
        <div className=" flex  flex-col gap-5">
          <div
            style={{
              backgroundImage: `url('http://localhost:3001/${user?.image}')`,
            }}
            className={`h-[25rem] w-2/3 bg-cover bg-center justify-center  col-span-1 items-center flex  overflow-hidden`}
          ></div>
          <div className="flex justify-around w-2/3 text-center gap-2">
            <div className="bg-green-600 p-2 w-fit rounded-md text-lg flex items-center gap-2 text-white">
              <Icon icon="material-symbols:attach-money" />
              <span className="">{user.monthly_income}</span>
            </div>
            <div className="bg-red-600 p-2 w-fit rounded-md text-lg flex items-center gap-2 text-white">
              <Icon icon="material-symbols:money-off-rounded" />
              <span className="">{user.monthly_expenses}</span>
            </div>
          </div>
          <div className="gap-y-2 flex flex-col text-lg tracking-wide ">
            <p className="flex gap-2 items-center ">
              <Icon icon="ph:user" className="w-10 text-xl" /> {user.name}
            </p>
            <p className="flex gap-2 items-center ">
              <Icon icon="ic:outline-email" className="w-10 text-xl" />{" "}
              {user.email}
            </p>
            <p className="flex gap-2 items-center ">
              <Icon icon="ion:card-outline" className="w-10 text-xl" />{" "}
              {user.DNI}
            </p>
            <p className="flex gap-2 items-center ">
              <Icon icon="ph:phone" className="w-10 text-xl" />{" "}
              {user.phone_number}
            </p>
            <div className="flex  gap-2 items-center ">
              <Icon
                icon="mdi:address-marker-outline"
                className="w-10 text-xl"
              />{" "}
              <span className="w-1/2">{user.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-wrap w-full overflow-x-auto">
          <p className="text-lg py-3 font-bold">Prestamos</p>
          {id && <LoanTable id={id} />}
        </div>
        <h1 className="font-bold py-3 text-lg">Copia de las cedula</h1>
        <div className="flex gap-2">
          {Array.isArray(user.dni_images) &&
            user.dni_images.map((img) => {
              return (
                <div
                  style={{
                    backgroundImage: `url('http://localhost:3001/${img}')`,
                  }}
                  className={`h-[15rem] w-1/2 bg-cover bg-center justify-center bg-yellow-700 col-span-1 items-center flex  overflow-hidden`}
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
