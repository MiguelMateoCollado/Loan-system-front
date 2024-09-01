"use client";
import Link from "next/link";
import { TableContent } from "../components/TableContent";
import { useAtomValue, useSetAtom } from "jotai";
import { loansAtom, refreshLoansAtom } from "../atoms/loanAtom";
import { useEffect } from "react";
import TextMoney from "../components/textMoney";
import { Pagination } from "../components/Pagination";
import { refreshPagesAtom } from "../atoms/paginationAtom";
const page = () => {
  const loans = useAtomValue(loansAtom);
  const onCharge = useSetAtom(refreshLoansAtom);
  const onChargePage = useSetAtom(refreshPagesAtom);
  useEffect(() => {
    onCharge();
  }, []);

  useEffect(() => {
    onChargePage("loans");
  }, [loans]);

  return (
    <div className="gap-3 col-span-10 p-10">
      <TableContent
        head={
          <tr>
            <th>Code #</th>
            <th>Tasa de interes</th>
            <th>Propietario</th>
            <th>Monto</th>
            <th>Ingresos mensuales</th>
            <th>Gastos mensuales</th>
            <th>Acciones</th>
          </tr>
        }
        data={loans.loans?.map((loan, index) => {
          return (
            <tr key={index} className="overflow-auto ">
              <td>{loan.search_code}</td>
              <td>{loan.interest_rate} %</td>
              <td>{loan.owner.name} </td>
              <td>
                <TextMoney>{loan.amount}</TextMoney>
              </td>
            </tr>
          );
        })}
      >
        <Link
          href={"/loans/create"}
          className="btn bg-black text-white hover:bg-black/90 rounded-md self-end w-fit my-2"
        >
          Crear prestamo
        </Link>
      </TableContent>
      <Pagination type={"loans"} />
    </div>
  );
};

export default page;
