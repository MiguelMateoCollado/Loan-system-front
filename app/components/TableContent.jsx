"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import clientCreatorContext from "../context/clientCreatorContext";
import axios from "axios";
import { Icon } from "@iconify/react";
import ButtonRebirded from "./ButtonRebirded";
import Sign from "./Sign";
export const TableContent = () => {
  const { setDeleteUser, deleteUser, router } =
    useContext(clientCreatorContext);
  let [users, setUsers] = useState([]);
  let [userEmail, setuserEmail] = useState("");
  let [loading, setloading] = useState(false);
  const handleDelete = () => {
    // Filtrar el array para excluir el elemento con el id proporcionado
    const newItems = users.filter((item) => item.email !== userEmail);
    // Actualizar el estado con el nuevo array
    setUsers(newItems);
    axios.delete(`http://localhost:3001/users/${userEmail}`);
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

  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div className="flex flex-wrap justify-center items-center w-full   ">
      <div className="w-11/12 flex justify-end">
        <Link
          href={"/clients/create"}
          className="btn btn-primary rounded-md self-end w-fit my-2"
        >
          Crear nuevo cliente
        </Link>
      </div>
      <table className="table-zebra table table-compact w-11/12">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Correo Electronico</th>
            <th>Numero telefonico</th>
            <th>Ingresos mensuales</th>
            <th>Gastos mensuales</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            users.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleDelete(user.id)}
                className="overflow-auto"
              >
                <td>
                  <div className="w-20 h-20 justify-center bg-yellow-700 items-center flex rounded-full overflow-hidden">
                    <img
                      className="object-cover h-[5rem]"
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
                <td>
                  <ButtonRebirded
                    className={"btn btn-outline-secondary rounded-md"}
                    onClick={(e) => {
                      router.push(`/clients/${user.email}`);
                    }}
                  >
                    <Icon icon="carbon:classification" />
                    Detalles
                  </ButtonRebirded>
                </td>
                <td>
                  <ButtonRebirded
                    className={"btn btn-outline-error rounded-md"}
                    onClick={() => {
                      setDeleteUser(true);
                      setuserEmail(user.email);
                    }}
                  >
                    <Icon icon="mdi:garbage-can-outline" />
                    Delete
                  </ButtonRebirded>{" "}
                  <ButtonRebirded className="btn btn-outline-primary rounded-md">
                    <Icon icon="lucide:pen-line" />
                    Editar
                  </ButtonRebirded>
                </td>
                <td>
                  {deleteUser && (
                    <Sign
                      icon={
                        <Icon
                          className="text-yellow-800 text-7xl"
                          icon="material-symbols:check-box"
                        />
                      }
                      message={"Seguro que quieres eliminar este usuario"}
                    >
                      <ButtonRebirded
                        onClick={() => {
                          setDeleteUser(false);
                          handleDelete();
                        }}
                      >
                        No
                      </ButtonRebirded>

                      <ButtonRebirded onClick={() => setDeleteUser(false)}>
                        Si
                      </ButtonRebirded>
                    </Sign>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
