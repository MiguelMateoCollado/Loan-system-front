"use client";
import clientCreatorContext from "./clientCreatorContext";
import { useState } from "react";
import validationSchema from "../resources/validationSchema";
import useCreateClient from "../hooks/useCreateClient";
import { useFormik } from "formik";
const StateClient = ({ children }) => {
  const { onCreateUser, success, setSuccess, router } = useCreateClient();
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      monthly_income: 0,
      monthly_expenses: 0,
      role: "668711dad14a94c218db8dd5",
      address: "",
      phone_number: "",
      DNI: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await onCreateUser(values, resetForm);
      resetForm({ role: "668711dad14a94c218db8dd5" });
    },
  });

  const [imageUpload, setUploadImage] = useState("");
  return (
    <clientCreatorContext.Provider
      value={{
        handleSubmit,
        handleChange,
        setFieldValue,
        success,
        setSuccess,
        imageUpload,
        setUploadImage,
        router,
        values,
        errors,
        onCreateUser,
      }}
    >
      {children}
    </clientCreatorContext.Provider>
  );
};

export default StateClient;
