import React, { useEffect, useState } from "react";
import { FORM_IMAGE } from "../Components/SVG";
import { commonAxios, commonPostAxios } from "../utils/commonAxios";
import { toast } from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "other",
    dob: "",
    age: 1,
  });

  const [apiData, setApiData] = useState({
    cityArr: [],
    stateArr: [],
    countryArr: [],
  });

  useEffect(() => {
    commonAxios("/allcountries").then((res) =>
      setApiData({ ...apiData, countryArr: res?.data })
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (e.target.name == "dob") {
      let age = new Date().getFullYear() - new Date(value).getFullYear();
      setData({ ...data, [name]: value, age });
    }
  };

  const ApiHandleChange = (e) => {
    const { name, value } = e.target;
    const { placeName, isoCode } = JSON.parse(value);
    setData({ ...data, [name]: placeName });

    if (name == "country")
      commonAxios(`/states-by-countrycode?countrycode=${isoCode}`).then((res) =>
        setApiData({ ...apiData, stateArr: res?.data })
      );
    else
      commonAxios(
        `/cities-by-countrycode-and-statecode?countrycode=IN&statecode=${isoCode}`
      ).then((res) => setApiData({ ...apiData, cityArr: res?.data }));
  };

  const handleSubmit = async () => {
    let validation = Object.keys(data).find((d) => !data[d]);
    if (validation) {
      toast.error(
        `Please Input : ${Object.keys(data)
          .filter((d) => !data[d])
          .join(", ")}`
      );
      return;
    }

    const response = await commonPostAxios(`user/register-user`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
      setData({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        state: "",
        city: "",
        gender: "other",
        dob: "",
        age: 1,
      });
    } else {
      toast.error("Registration failed!");
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Registration Form
            </h2>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <img src={FORM_IMAGE} alt="image" />
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 flex gap-4">
                      <input
                        id="full_name"
                        type="text"
                        name="firstName"
                        value={data?.firstName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="first name"
                      />

                      <input
                        id="full_name"
                        type="text"
                        name="lastName"
                        value={data?.lastName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="last name"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => handleChange(e)}
                        value={data?.email}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <select
                        id="gender"
                        name="gender"
                        required
                        onChange={(e) => handleChange(e)}
                        value={data?.gender || "other"}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option defaultValue="other">Other</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <input
                        type="date"
                        min="1970-01-01T00:00"
                        max={new Date().toISOString().split("T")[0]}
                        id="dob"
                        name="dob"
                        onChange={(e) => handleChange(e)}
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                          id="country"
                          name="country"
                          required
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          onChange={(e) => ApiHandleChange(e)}
                          // value={data?.country}
                        >
                          <option value="">{"select country"}</option>
                          {apiData?.countryArr.map((d, i) => (
                            <React.Fragment key={i}>
                              <option
                                value={JSON.stringify({
                                  isoCode: d?.isoCode,
                                  placeName: d?.name,
                                })}
                              >
                                {d?.name}
                              </option>
                            </React.Fragment>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                          id="state"
                          name="state"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          required
                          onChange={(e) => ApiHandleChange(e)}
                        >
                          <option value="">{"select state"}</option>
                          {apiData?.stateArr.map((d, i) => (
                            <React.Fragment key={i}>
                              <option
                                value={JSON.stringify({
                                  placeName: d?.name,
                                  isoCode: d?.isoCode,
                                })}
                              >
                                {d?.name}
                              </option>
                            </React.Fragment>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                          id="city"
                          name="city"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          required
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">{"select city"}</option>
                          {apiData?.cityArr.map((d, i) => (
                            <React.Fragment key={i}>
                              <option value={d?.name}>{d?.name}</option>
                            </React.Fragment>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <input
                        id="email"
                        type="number"
                        name="age"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={data?.age}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter age"
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="button"
                          onClick={() => handleSubmit()}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
