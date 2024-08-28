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
import ErrorSign from "@/app/components/ErrorSign";
import Sign from "@/app/components/Sign";
import { payment_methodAtom, type_of_paymentAtom } from "@/app/atoms/loanAtom";
import { useAtom } from "jotai";
export const page = () => {
  const {
    values,
    handleSubmit,
    handleChange,
    setSuccess,
    errors,
    success,
    setFieldValue,
  } = useContext(loansContext);
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState();
  const [payment_method, setPayment_method] = useAtom(payment_methodAtom);
  const [type_of_payment, setType_of_payment] = useAtom(type_of_paymentAtom);
  useEffect(() => {
    async function getAll() {
      let response = await axios.get("http://localhost:3001/users/all");
      setUsers(await response.data);
    }
    getAll();
  }, []);

  const handleChangeUser = (e) => {
    e.preventDefault();
    setSelectUser(users.filter((user) => user.id == e.target.value)[0]);
  };
  useEffect(() => {
    console.log(values);
  }, [values]);
  useEffect(() => {
    async function setUser() {
      setSelectUser(await users[0]);
      setFieldValue("owner", await users[0]?.id);
    }
    setUser();
  }, [users]);
  let typeofPay = [
    { label: "Bi semanal", value: "BYWEEKLY" },
    { label: "Mensual", value: "MONTH" },
    { label: "Diario", value: "DAILY" },
  ];
  let paymentMethod = [
    {
      label: "Capital & Reditos",
      value: "CAPITAL_PAYMENT_AND_INTEREST",
    },
    { label: "Intereses", value: "INTEREST" },
    { label: "Redito", value: "REDITO" },
  ];
  return (
    <div className="flex  col-span-10">
      <div className="col-span-1 p-5 m-2 flex justify-center rounded-md w-1/2 bg-gradient-to-br from-zinc-700 via-gray-800 to-zinc-900">
        {selectUser !== undefined && (
          <div className=" flex flex-col p-2 gap-y-3 justify-start h-fit items-center">
            <div
              style={{
                backgroundImage: `url('http://localhost:3001/${selectUser?.image}')`,
              }}
              className={`h-[10rem] border-white/25 border  w-[10rem] rounded-full bg-cover bg-center justify-center  col-span-1 items-center flex  overflow-hidden`}
            ></div>
            <ul className="flex flex-col justify-start gap-y-3">
              <li className="flex text-white ">
                <Icon
                  icon="material-symbols-light:account-box"
                  className="size-8"
                />
                <div className="flex items-center mr-2 ">
                  <span className="text-base ">{selectUser.name}</span>
                </div>
              </li>
              <li className="flex text-white">
                <Icon
                  icon="material-symbols-light:phone-android"
                  className="size-8"
                />
                <div className="flex items-center mr-2">
                  <span className="text-base">
                    {selectUser.phone_number.slice(0, 3)}-
                    {selectUser.phone_number.slice(3, 6)}-
                    {selectUser.phone_number.slice(6, 10)}
                  </span>
                </div>
              </li>
              <li className="flex text-white">
                <Icon
                  icon="material-symbols-light:id-card-outline-rounded"
                  className="size-8"
                />
                <div className="flex items-center mr-2">
                  <span>
                    {selectUser.DNI.slice(0, 3)}-{selectUser.DNI.slice(3, 10)}-
                    {selectUser.DNI.slice(10, 11)}
                  </span>
                </div>
              </li>
              <li className="flex text-white">
                <Icon
                  icon="material-symbols-light:location-on-rounded"
                  className="size-8"
                />
                <div className="flex items-center mr-2">
                  <span>{selectUser.address}</span>
                </div>
              </li>
              <li>
                {" "}
                <div className="text-white flex items-center">
                  <Icon
                    icon="material-symbols-light:mail-outline-rounded"
                    className="size-6"
                  />
                  <span className="">{selectUser.email}</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <FormComp
        className={"border border-black m-3 h-fit rounded-md my-auto"}
        onSubmit={handleSubmit}
      >
        <label htmlFor="owner" className="flex flex-col">
          Seleccionar cliente
          <select
            name="owner"
            id="owner"
            className="select border border-black select-block  rounded-md"
            onChange={(e) => {
              handleChangeUser(e);
              handleChange(e);
            }}
          >
            {users.length !== 0 &&
              users.map((user) => {
                return (
                  <option key={user.id} name="owner" id="owner" value={user.id}>
                    {user.name}
                  </option>
                );
              })}
          </select>
        </label>

        {inputs.map((item) => {
          return (
            <InputType
              data={item}
              context={loansContext}
              key={item.id}
              className={`border input border-black select-block placeholder:text-black/70 rounded-md`}
            />
          );
        })}

        <label htmlFor="payment_type">
          Tipo de pago
          <div className="btn-group btn-group-rounded btn-group-scrollable border divide-x border-black items-center h-fit rounded-full">
            {typeofPay.map((type, index) => {
              return (
                <label
                  key={index}
                  className={`relative w-full btn ${
                    type_of_payment == type.value ? "bg-green-500" : ""
                  } `}
                >
                  {type.label}
                  <input
                    type="radio"
                    name="payment_type"
                    id="payment_type"
                    onClick={(e) => {
                      setType_of_payment(e.target.value);
                      console.log(e.target);
                      handleChange(e);
                    }}
                    value={type.value}
                    key={type.value}
                    className={`absolute hidden ${
                      type_of_payment == type.value
                        ? "placeholder:text-white"
                        : ""
                    }`}
                  />
                </label>
              );
            })}
          </div>
          {errors && <ErrorSign errors={errors} name="payment_type" />}
        </label>
        <label htmlFor="payment_method">
          Metodo de pago
          <div className="btn-group btn-group-rounded btn-group-scrollable border divide-x border-black items-center h-fit rounded-full">
            {paymentMethod.map((type, index) => {
              return (
                <label
                  key={index}
                  className={`relative w-full btn ${
                    payment_method == type.value ? "bg-green-500" : ""
                  } `}
                >
                  {type.label}
                  <input
                    type="radio"
                    id="payment_method"
                    name="payment_method"
                    onClick={(e) => {
                      setPayment_method(e.target.value);
                      handleChange(e);
                    }}
                    value={type.value}
                    key={type.value}
                    className={`absolute hidden ${
                      payment_method == type.value
                        ? "placeholder:text-white"
                        : ""
                    }`}
                  />
                </label>
              );
            })}
          </div>
          {errors && <ErrorSign errors={errors} name="payment_method" />}
        </label>

        <div className="col-span-1">
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
        </div>
        <button
          type="submit"
          className="btn-primary hover:to-blue-400 col-span-1 btn rounded-md btn-block "
          onClick={() => setSuccess(true)}
        >
          Crear prestamo
        </button>
      </FormComp>
    </div>
  );
};

export default page;
