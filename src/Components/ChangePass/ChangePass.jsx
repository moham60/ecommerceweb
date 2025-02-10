import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {
  const [isloading, setisloading] = useState(false);
  function resetPassword(email, newPassword) {
    setisloading(true);
    const res = axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
      })
      .then(() => {
        setisloading(false);
        return true;
      })
      .catch((res) => {
        console.log(res);
        setisloading(false);
        return false;
      });
    return res;
  }
  const navigate = useNavigate();
  const formikObj = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: async function (values) {
      const res = await resetPassword(values.email, values.newPassword);
      if (res) {
        setTimeout(() => {
          return toast.success("Success to update Password", {
            position: "top-center",
            duration: 2000,
          });
        }, 2000);
        navigate("/login");
      }
    },
  });

  return (
    <>
      <div className=" py-8 login  relative   dark:bg-black dark:text-white">
        {isloading ? (
          <div className="fixed flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
            {<LoaderScreen />};
          </div>
        ) : (
          ""
        )}
        <form
          onSubmit={formikObj.handleSubmit}
          className="w-[90%] bg-white mx-auto shadow-lg dark:bg-white dark:text-b rounded-lg p-5">
          <h1 className="text-center my-2 text-black font-bold text-3xl">
            Change Password
          </h1>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formikObj.handleChange}
              value={formikObj.values.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formikObj.handleChange}
              value={formikObj.values.newPassword}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            className="text-white bg-[#17f317] hover:bg-[#28da04] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
