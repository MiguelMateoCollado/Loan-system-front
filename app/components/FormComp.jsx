"use client";
import { useContext } from "react";
import clientCreatorContext from "../context/clientCreatorContext";
const FormComp = ({ children }) => {
  const { handleSubmit } = useContext(clientCreatorContext);
  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="grid grid-cols-2 container gap-x-4 align-middle "
    >
      {children}
    </form>
  );
};

export default FormComp;
