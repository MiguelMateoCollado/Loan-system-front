"use client";
import loansContext from "@/app/context/loansContext";
import { InputType } from "@/app/components/InputType";
import React from "react";
import { useContext, useEffect, useState } from "react";
import FormComp from "@/app/components/FormComp";
import axios from "axios";
import ButtonRebirded from "@/app/components/ButtonRebirded";
import { Icon } from "@iconify/react";
import inputs from "@/app/resources/inputsLoan";
import Select from "react-select";
import Sign from "@/app/components/Sign";
export const page = () => {
  const { values, handleSubmit, setSuccess, success } =
    useContext(loansContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getAll() {
      let response = await axios.get("http://localhost:3001/users/all");
      setUsers(await response.data);
    }
    getAll();
  }, []);
  let typeofPay = [
    { label: "Bi semanal", value: "BYWEEKLY" },
    { label: "Mensual", value: "MONTH" },
    { label: "Diario", value: "DAILY" },
  ];
  return (
    <div className="flex justify-center min-h-screen flex-col col-span-9 items-center">
      <FormComp onSubmit={handleSubmit}>
        <div className="col-span-2">
          <select name="owner" id="owner" className="select rounded-md">
            {users.length !== 0 &&
              users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
          </select>
          <select
            name="payment_type"
            id="payment_type"
            class="btn-group btn-group-rounded btn-group-scrollable"
          >
            {typeofPay.map((type) => {
              return (
                <option value={type.value} key={type.value} className={`btn`}>
                  {type.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="interest_rate">
            Tasa de interes
            <input
              type="number"
              className="input rounded-md"
              id="interest_rate"
              max={100}
            />
          </label>
        </div>
        <div className="col-span-1 ">
          {success && (
            <Sign
              icon={
                <Icon
                  className="text-green-400 text-7xl"
                  icon="material-symbols:check-box"
                />
              }
              message={"Usuario Creado correctamente"}
            >
              <ButtonRebirded
                onClick={() => {
                  setSuccess(false);
                }}
              >
                Salir
              </ButtonRebirded>

              <ButtonRebirded onClick={() => setSuccess(false)}>
                Quedarse
              </ButtonRebirded>
            </Sign>
          )}
          <button
            type="submit"
            className="bg-red-500"
            onClick={() => setSuccess(true)}
          >
            Enviar
          </button>
        </div>
      </FormComp>
    </div>
  );
};

export default page;
