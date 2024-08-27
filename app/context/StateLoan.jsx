"use client";
import React, { useState } from "react";
import loansContext from "./loansContext";
import { useFormik } from "formik";
import axios from "axios";
export const StateLoan = ({ children }) => {
  const onCreateLoan = async (data) => {
    setSuccess(false);
    let response = await axios
      .post("http://localhost:3001/loans", {
        camps: data,
      })
      .then((response) => {
        return response.data;
      });

    setSuccess(true);
  };
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    values,
    resetForm,
    handleChange,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      owner: "",
      interest_rate: 0,
      payment_type: "",
      delay_days: 0,
      arrears_rate: 0,
      payment_method: "",
      amount: 0,
      months: 0,
    },

    onSubmit: (values) => {
      onCreateLoan(values);
    },
  });

  return (
    <loansContext.Provider
      value={{
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        setSuccess,
        success,
        errors,
      }}
    >
      {children}
    </loansContext.Provider>
  );
};

export default StateLoan;
