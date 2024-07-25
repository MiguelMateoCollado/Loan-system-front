"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import clientCreatorContext from "../context/clientCreatorContext";
import axios from "axios";
import { Icon } from "@iconify/react";
import { SuccessSign } from "./SuccessSign";
export const TableContent = () => {
  const { success, setSuccess } = useContext(clientCreatorContext);
  let [users, setUsers] = useState([]);
  let [loading, setloading] = useState(false);
  const handleDelete = (e, email) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/users/${email}`);
    setUsers(users.filter((user) => user.email !== email));
  };
  useEffect(() => {
    let getUsers = async () => {
      try {
        setloading(true);
        let response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
        setloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="flex flex-col w-full col-span-4  col-start-1  overflow-x-auto">
      <Link
        href={"/clients/create"}
        className="btn btn-primary rounded-md w-fit my-2"
      >
        Crear nuevo cliente
      </Link>
      <table className="table-zebra table w-1/2">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Correo Electronico</th>
            <th>Numero telefonico</th>
            <th>Ingresos mensuales</th>
            <th>Gastos mensuales</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            users.map((user, index) => {
              return (
                <tr key={index} className="overflow-auto">
                  <td>
                    <div className="w-20 h-20 items-center flex rounded-full overflow-hidden">
                      <img
                        className="object-cover h-[8rem] w-fit"
                        src={`http://localhost:3001/${user.image}`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.monthly_income}</td>
                  <td>{user.monthly_expenses}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-outline-error rounded-md"
                      onClick={(e) => {
                        setSuccess(true);
                        handleDelete(e, user.email);
                      }}
                    >
                      <Icon icon="mdi:garbage-can-outline" />
                      Delete
                    </button>{" "}
                    <button className="btn btn-outline-primary rounded-md">
                      <Icon icon="lucide:pen-line" />
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
