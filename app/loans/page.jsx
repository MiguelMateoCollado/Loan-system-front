"use client";
import Link from "next/link";
import { TableContent } from "../components/TableContent";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { loansAtom, refreshLoansAtom } from "../atoms/loanAtom";
import { useEffect } from "react";
import TextMoney from "../components/textMoney";
import { Pagination } from "../components/Pagination";
import moment from "moment";
import { currentPageAtom, refreshPagesAtom } from "../atoms/paginationAtom";
const page = () => {
  const loans = useAtomValue(loansAtom);
  const onCharge = useSetAtom(refreshLoansAtom);
  const onChargePage = useSetAtom(refreshPagesAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  useEffect(() => {
    onCharge();
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    onChargePage("loans");

    setCurrentPage(1);
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
            <th>Monto Mensual</th>
            <th>Tipo de pago</th>
            <th>Fecha de pago</th>
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
              <td>10,000</td>
              <td>
                {loan.payment_method
                  .split("_")
                  .map(
                    (x) =>
                      x.slice(0, 1) + x.slice(1, x.length).toLowerCase() + " "
                  )}
              </td>
              <td>
                {console.log(
                  moment(new Date()).date() > moment(loan.start_date).date()
                )}
                {moment(new Date()).date() > moment(loan.start_date).date()
                  ? moment(new Date()).diff(loan.start_date, "months") < 1
                    ? moment(loan.start_date).add(1, "months").format("L")
                    : moment(loan.start_date)
                        .add(
                          moment(new Date()).diff(loan.start_date, "months"),
                          "months"
                        )
                        .format("L")
                  : moment(new Date()).diff(loan.start_date, "months") < 1
                  ? moment(loan.start_date).add(1, "months").format("L")
                  : moment(loan.start_date)
                      .add(
                        1 + moment(new Date()).diff(loan.start_date, "months"),
                        "months"
                      )
                      .format("L")}
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
