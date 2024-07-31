import { useContext } from "react";
import ClientCreatorContext from "../context/clientCreatorContext";

import { Icon } from "@iconify/react";

export const Sign = ({ icon, message, children }) => {
  return (
    <div className="absolute bg-black/20 min-h-screen z-40 top-0 min-w-full flex items-center justify-center left-0">
      <div className="bg-white relative w-fit p-5 rounded-lg items-center justify-center flex flex-col">
        {icon}
        {message}
        <div className="flex flex-row gap-4 p-3">{children}</div>
      </div>
    </div>
  );
};

/*
  <div className="absolute bg-black/20 min-h-screen z-40 top-0 min-w-full flex items-center justify-center left-0">
      <div className="bg-white relative w-fit p-5 rounded-lg items-center justify-center flex flex-col">
        {icon}
        {message}
        <div className="flex flex-row gap-4 p-3">{children}</div>
      </div>
    </div>
*/

const Error = ({ children }) => {
  const { errorHandler, setErrorHandler } = useContext(ClientCreatorContext);
  return (
    <div className="absolute bg-black/20 min-h-screen z-40 top-0 min-w-full flex items-center justify-center left-0">
      <div className="bg-white relative w-fit p-5 rounded-lg items-center justify-center flex flex-col">
        <Icon
          className="text-7xl text-red-400"
          icon="material-symbols:error-circle-rounded-outline-sharp"
        />
        {errorHandler.message}
        <div className="flex flex-row gap-4 p-3">
          <button
            className="btn btn-outline-error w-fit"
            type="button"
            onClick={() => setErrorHandler({ active: false, message: "" })}
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

Sign.Error = Error;
export default Sign;
