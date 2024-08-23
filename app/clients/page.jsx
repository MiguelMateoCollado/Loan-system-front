import React from "react";
import { TableContent } from "../components/TableContent";

const page = () => {
  return (
    <div className="gap-3 col-span-10 p-10">
      <TableContent url="http://localhost:3001/users/"></TableContent>
    </div>
  );
};

export default page;
