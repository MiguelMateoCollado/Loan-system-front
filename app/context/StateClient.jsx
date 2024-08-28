"use client";
import clientCreatorContext from "./clientCreatorContext";
import { useState } from "react";
import validationSchema from "../resources/validationSchema";
import useCreateClient from "../hooks/useCreateClient";
import { useFormik } from "formik";
const StateClient = ({ children }) => {
  const {
    onCreateUser,
    success,
    setSuccess,
    router,
    errorHandler,
    setErrorHandler,
    setDeleteUser,
    deleteUser,
    setuserEmail,
    userEmail,
  } = useCreateClient();
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
      dni_images: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onCreateUser(values);
        resetForm({ role: "668711dad14a94c218db8dd5" });
      } catch (error) {
        setErrorHandler({ active: true, message: error.message });
      }
    },
  });

  const [imageUpload, setUploadImage] = useState({ foto: "", dni_images: "" });
  return (
    <clientCreatorContext.Provider
      value={{
        errorHandler,
        handleSubmit,
        handleChange,
        setErrorHandler,
        setFieldValue,
        success,
        setuserEmail,
        userEmail,
        setSuccess,
        imageUpload,
        setUploadImage,
        router,
        values,
        errors,
        onCreateUser,
        setDeleteUser,
        deleteUser,
      }}
    >
      {children}
    </clientCreatorContext.Provider>
  );
};

export default StateClient;
