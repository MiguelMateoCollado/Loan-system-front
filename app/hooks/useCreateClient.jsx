"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
const useCreateClient = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const onCreateUser = async (data) => {
    try {
      const url = await axios.post("http://localhost:3001/upload", data.image);
      data.image = url.data.imageUrl;
      setSuccess(false);
      await axios
        .post("http://localhost:3001/clients", data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setSuccess(true);

      //alert(JSON.stringify(data, null, 2));
      // router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return {
    onCreateUser,
    success,
    setSuccess,
    router,
  };
};

export default useCreateClient;
