"use client";
import clientCreatorContext from "../context/clientCreatorContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";

export const useOptionButtons = () => {
  const { setuserEmail, router, setDeleteUser } =
    useContext(clientCreatorContext);
  let buttonInputs = [
    {
      method: (user) => {
        router.push(`/clients/${user.id}`);
      },
      icon: <Icon icon="carbon:classification" />,
      buttonStyle: "btn btn-outline-primary rounded-md",
    },
    {
      method: (user) => {
        setDeleteUser(true);
        setuserEmail(user.email);
      },

      icon: <Icon icon="mdi:garbage-can-outline" />,
      buttonStyle: "btn btn-outline-secondary rounded-md",
    },
    {
      method: (user) => {
        router.push(`/clients/${user.id}`);
      },
      icon: <Icon icon="lucide:pen-line" />,
      buttonStyle: "btn btn-outline-error rounded-md",
    },
  ];
  return { buttonInputs };
};
export default useOptionButtons;
