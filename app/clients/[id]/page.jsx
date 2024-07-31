"use client";
import { TableContent } from "@/app/components/TableContent";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
const page = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      let user = await fetch(`http://localhost:3001/users/${id}`).then(
        (response) => response.json()
      );
      setUser(user);
    }
    getUser();
  }, []);
  return (
    <div className="bg-yellow-50 col-span-9 p-5 gap-x-2 grid grid-cols-5">
      <div className="col-span-2">
        <div className=" flex  flex-col gap-5">
          <div className=" w-3/4 justify-center bg-yellow-700 col-span-1 items-center flex  overflow-hidden">
            <img
              className="object-cover "
              src={`http://localhost:3001/${user.image}`}
              alt=""
            />
          </div>
          <div className="gap-y-2 flex flex-col text-lg tracking-wide ">
            <p className="flex gap-2 items-center ">
              <Icon icon="ph:user" className="w-10" /> {user.name}
            </p>
            <p className="flex gap-2 items-center ">
              <Icon icon="ic:outline-email" className="w-10" /> {user.email}
            </p>
            <p className="flex gap-2 items-center ">
              <Icon icon="ion:card-outline" className="w-10" /> {user.DNI}
            </p>
            <p className="flex gap-2 items-center ">
              <Icon icon="ph:phone" className="w-10" /> {user.phone_number}
            </p>
            <div className="flex  gap-2 items-center ">
              <Icon icon="mdi:address-marker-outline" className="w-10" />{" "}
              <span className="">{user.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex w-full overflow-x-auto">
          <table className="table-zebra table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Where</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
