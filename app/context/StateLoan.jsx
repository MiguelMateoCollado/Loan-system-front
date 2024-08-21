"use client";
import React, { useState } from "react";
import loansContext from "./loansContext";
import { useFormik } from "formik";

export const StateLoan = ({ children }) => {
  const onCreateLoan = async (data) => {
    /*
    setSuccess(false);
    let response = await axios
      .post("http://localhost:3001/loans", data)
      .then((response) => {
        return response.data;
      });
    */
  };
  const [success, setSuccess] = useState(false);
  const { handleSubmit, values, resetForm, handleChange } = useFormik({
    initialValues: {
      owner: "",
      interest_rate: "",
      payment_type: "",
      delay_days: 0,
      arrears_rate: 0,
      payment_method: "",
      amount: 0,
    },

    onSubmit: async (values) => {
      try {
        await onCreateLoan(values, resetForm);
      } catch (error) {}
    },
  });

  return (
    <loansContext.Provider
      value={{ values, handleChange, handleSubmit, setSuccess, success }}
    >
      {children}
    </loansContext.Provider>
  );
};

export default StateLoan;
