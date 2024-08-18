"use client";
import clientCreatorContext from "../context/clientCreatorContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import { userEmailAtom } from "../atoms/usersAtom";

export const useOptionButtons = () => {
  const { setuserEmail, router, setDeleteUser } =
    useContext(clientCreatorContext);
  const [, setUserEmail] = useAtom(userEmailAtom);
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

        setUserEmail(user.email);
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
