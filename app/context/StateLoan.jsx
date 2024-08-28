"use client";
import React, { useState } from "react";
import loansContext from "./loansContext";
import { useFormik } from "formik";
import validationSchema from "../resources/validationLoanSchema";
import axios from "axios";
import { payment_methodAtom, type_of_paymentAtom } from "@/app/atoms/loanAtom";
import { useAtom, useSetAtom } from "jotai";
export const StateLoan = ({ children }) => {
  const setPayment_method = useSetAtom(payment_methodAtom);
  const setType_of_payment = useSetAtom(type_of_paymentAtom);
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
    validationSchema,
    onSubmit: (values) => {
      try {
        onCreateLoan(values);
        setType_of_payment("");
        setPayment_method("");
        resetForm({ owner: values.owner });
      } catch (error) {}
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
