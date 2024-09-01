"use client";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect } from "react";
import axios from "axios";

import { loansAtom } from "../atoms/loanAtom";
export const LoanTable = ({ id }) => {
  const [loans, setLoans] = useAtom(loansAtom);
  useEffect(() => {
    const getLoansByUser = async () => {
      let response = await axios.get(`http://localhost:3001/loans/${id}`);
      setLoans(await response.data);
    };

    getLoansByUser();
  }, []);
  useEffect(() => {
    console.log(loans);
  }, [loans]);
  return (
    <div className="flex w-full overflow-x-auto">
      <table className="table-zebra table">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Metodo de pago</th>
            <th>Tipo de pago</th>
            <th>Meses</th>
          </tr>
        </thead>
        <tbody>
          {loans.length > 0 &&
            loans?.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.amount}</td>
                <td>{loan.payment_method}</td>
                <td>{loan.payment_type}</td>
                <td>{loan.months}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
