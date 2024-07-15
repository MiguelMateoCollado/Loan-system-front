"use client";
import { useContext } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import inputsData from "../resources/inputsData";
import DropzoneBox from "../components/DropzoneBox";
import { InputType } from "../components/InputType";
import { SuccessSign } from "../components/SuccessSign";
import ErrorSign from "../components/ErrorSign";
import clientCreatorContext from "../context/clientCreatorContext";

const page = () => {
  const { errors, handleSubmit, handleChange, values, success } =
    useContext(clientCreatorContext);
  return (
    <div className="flex justify-center min-h-screen flex-col items-center">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="grid grid-cols-2 container gap-x-4 align-middle "
      >
        <div className="col-span-1 flex flex-col gap-4 items-center">
          <DropzoneBox />
          {errors["image"] && <ErrorSign>{errors["image"]}</ErrorSign>}
        </div>

        <div className="col-span-1 grid grid-cols-2 gap-4">
          <h1 className="col-span-2">Crea un nuevo cliente</h1>
          {inputsData.map((data) => {
            return (
              <InputType
                data={data}
                key={data.id}
                textareaClassName="textarea-block p-2 min-h-52 max-h-52"
                className={`rounded-md border input-ghost-gray input  input-md`}
              />
            );
          })}

          <div className="col-span-1 flex gap-4 rounded-md flex-col relative items-center">
            <div className="flex relative gap-4">
              <span className="fi absolute text-2xl z-10 fi-do"></span>
              <input
                className="input rounded-md z-0 "
                id="phone_number"
                placeholder=" Ingresar numero de telefono"
                name="phone_number"
                value={values["phone_number"]}
                onChange={handleChange}
              />
            </div>
            {errors["phone_number"] && (
              <ErrorSign>{errors["phone_number"]}</ErrorSign>
            )}
          </div>

          {success && <SuccessSign />}

          <button
            type="submit"
            className="btn btn-outline-primary rounded-md col-span-2"
          >
            Crear cliente
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
