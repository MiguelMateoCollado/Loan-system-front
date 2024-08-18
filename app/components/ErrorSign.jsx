"use client";
import { useContext } from "react";
import clientCreatorContext from "../context/clientCreatorContext";

const ErrorSign = ({ children, name }) => {
  const { errors } =
    useContext(clientCreatorContext);
  if (errors[name]) {
    return (
      <div className="bg-red-600 p-1 my-2 rounded-md w-fit text-white">
        {errors[name]}
      </div>
    );
  }
};

export default ErrorSign;
