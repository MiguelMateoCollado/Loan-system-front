"use client";
import { useContext } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import inputsData from "../../resources/inputsData";
import DropzoneBox from "../../components/DropzoneBox";
import { InputType } from "../../components/InputType";
import Sign from "../../components/Sign";
import ErrorSign from "../../components/ErrorSign";
import clientCreatorContext from "../../context/clientCreatorContext";
import FormComp from "../../components/FormComp";
import { Icon } from "@iconify/react";
import ButtonRebirded from "@/app/components/ButtonRebirded";
import { useAtomValue, useSetAtom } from "jotai";
import { onChangePageAtom } from "@/app/atoms/usersAtom";
import { pagesAtom } from "@/app/atoms/paginationAtom";
const page = () => {
  const { router, values, handleSubmit, success, errorHandler, setSuccess } =
    useContext(clientCreatorContext);
  const onChangePage = useSetAtom(onChangePageAtom);
  const pages = useAtomValue(pagesAtom);
  return (
    <div className="p-10 col-span-10 flex justify-center">
      <FormComp onSubmit={handleSubmit}>
        <div className="flex flex-col col-span-1 gap-y-3">
          <DropzoneBox>
            <ErrorSign name="image" />
          </DropzoneBox>

          <DropzoneBox.Cedula>
            <ErrorSign name="dni_images" />
          </DropzoneBox.Cedula>
        </div>
        <div className="grid grid-cols-2  gap-x-2">
          <h1 className="col-span-2">Crea un nuevo cliente</h1>
          {inputsData.map((data) => {
            return (
              <InputType
                data={data}
                key={data.id}
                textareaClassName="textarea-block p-2 min-h-52 max-h-52"
                className={`rounded-md border input-block  bg-white flex flex-col text-black/90 placeholder:text-black/80 input border-black `}
              />
            );
          })}

          <div className="col-span-1 flex gap-4 rounded-md flex-col relative">
            <div className="flex relative gap-4">
              <span className="fi absolute text-2xl z-10 fi-do"></span>
              <InputType
                data={{
                  id: "phone_number",
                  name: "phone_number",
                  value: values["phone_number"],
                  placeholder: "Ingresar numero de telefono",
                }}
                className="rounded-md border bg-white flex flex-col text-black/90 placeholder:text-black/80 input  border-black w-full  input-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary rounded-md col-span-2"
          >
            Crear cliente
          </button>
        </div>
      </FormComp>
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
              onChangePage(pages);
              router.push("/clients");
            }}
          >
            Salir
          </ButtonRebirded>

          <ButtonRebirded onClick={() => setSuccess(false)}>
            Quedarse
          </ButtonRebirded>
        </Sign>
      )}
      {errorHandler.active == true && <Sign.Error />}
    </div>
  );
};

export default page;
