import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../utils/Base";

const Userdetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`${BASE_URL}user/get-all-user`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  return (
    <>
      <div className="container mt-5 mx-auto">
        <h1 className="text-2xl font-bold">Users Table</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">S.no</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">D.O.B</th>
                <th className="px-4 py-2">Age</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((ele, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-4 py-2">{index + 1}.</td>
                    <td className="px-4 py-2">{ele?.firstName}</td>
                    <td className="px-4 py-2">{ele?.lastName}</td>
                    <td className="px-4 py-2">{ele?.email}</td>
                    <td className="px-4 py-2">{ele?.country}</td>
                    <td className="px-4 py-2">{ele?.state}</td>
                    <td className="px-4 py-2">{ele?.city}</td>
                    <td className="px-4 py-2">{ele?.gender}</td>
                    <td className="px-4 py-2">{ele?.dob.split("T")[0]}</td>
                    <td className="px-4 py-2">{ele?.age}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Userdetails;
