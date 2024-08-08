"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import generateMessage from "../resources/generateMessage";
const useCreateClient = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  let [userEmail, setuserEmail] = useState("");

  const [errorHandler, setErrorHandler] = useState({
    active: false,
    message: "",
  });
  const onCreateUser = async (data) => {
    setSuccess(false);
    const allRequests = [{ data: data.image }, { data: data.dni_images }];
    const response = await axios.all(
      allRequests.map((request) =>
        axios
          .post("http://localhost:3001/uploads", request.data)
          .then((response) => {
            console.log(response);
            return response.data;
          })
      )
    );

    let manteinPhoto = data.image;
    let manteinDniImages = data.dni_images;
    data.dni_images = response[1];
    data.image = response[0].imageUrl;

    await axios
      .post("http://localhost:3001/clients", data)
      .then(() => {
        data.image = manteinPhoto;
        data.dni_images = manteinDniImages;
        setSuccess(true);
        setErrorHandler({ active: false, message: "" });
      })
      .catch(async (error) => {
        data.image = manteinPhoto;
        data.dni_images = manteinDniImages;
        if (error.response.data.code === "P2002") {
          let target = await generateMessage(error.response.data.meta.target);
          setErrorHandler({ active: true, message: target });
          throw new Error(target);
        }
        setErrorHandler({ active: true, message: error.message });
        throw new Error(error);
      });
  };

  const handleDelete = (e, email) => {
    if (success == false) {
      e.preventDefault();
      axios.delete(`http://localhost:3001/users/${email}`);
      setUsers(users.filter((user) => user.email !== email));
    }
  };

  return {
    onCreateUser,
    deleteUser,
    setDeleteUser,
    success,
    setErrorHandler,
    setSuccess,
    router,
    setuserEmail,
    userEmail,
    handleDelete,
    errorHandler,
  };
};

export default useCreateClient;
