"use client";
import { useContext, useEffect } from "react";
import clientCreatorContext from "../context/clientCreatorContext";
import { Icon } from "@iconify/react";
const ErrorSign = ({ name, errors }) => {
  if (errors[name]) {
    return (
      <div className=" text-red-500 p-1 flex items-center gap-x-3  rounded-md w-fit">
        <Icon icon="gravity-ui:circle-exclamation" className="text-xl" />
        <span className="text-base">{errors[name]}</span>
      </div>
    );
  }
};

export default ErrorSign;
