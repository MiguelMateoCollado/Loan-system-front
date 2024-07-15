import { useContext } from "react";
import ClientCreatorContext from "../context/clientCreatorContext";

import { Icon } from "@iconify/react";

export const SuccessSign = ({}) => {
  const { setSuccess, router } = useContext(ClientCreatorContext);
  return (
    <div className="absolute bg-black/20 min-h-screen z-40 top-0 min-w-full flex items-center justify-center left-0">
      <div className="bg-white relative w-fit p-5 rounded-lg items-center justify-center flex flex-col">
        <Icon
          className="text-green-400 text-7xl"
          icon="material-symbols:check-box"
        />
        Usuario Creado correctamente
        <div className="flex flex-row gap-4 p-3">
          <button
            className="btn btn-outline-success w-1/2"
            onClick={() => router.push("/")}
          >
            Salir
          </button>
          <button
            className="btn btn-outline-primary w-1/2"
            onClick={() => setSuccess(false)}
          >
            Quedarse
          </button>
        </div>
      </div>
    </div>
  );
};
