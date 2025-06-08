import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";

export default function ForgotPass() {
  const [isConfirm, setisConfirm] = useState(true);
  const [isloading, setisloading] = useState(false);
  function forgotpassword(email) {
    setisloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: email,
      })
      .then((res) => {
        console.log(res);
        setisloading(false);
      })
      .catch((res) => {
        console.log(res);
        setisloading(false);
      });
  }

  function verifyCode(code) {
    setisloading(true);
    const res = axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: code,
      })
      .then((res) => {
        console.log(res);
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
  async function handleSubmit(values) {
    const res = await verifyCode(values);
    console.log(res);
    if (res) {
      navigate("/changePass");
    }
  }
  const formikObj = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: function (values) {
      if (values.email?.trim() !== "") {
        forgotpassword(values.email);
        setisConfirm(false);
      }
    },
  });
  const formikobj2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: function (values) {
      handleSubmit(values.resetCode);
    },
  });

  return (
    <div className=" py-8 login  relative   dark:bg-black dark:text-white">
      {isloading ? (
        <div className="fixed flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      {isConfirm ? (
        <form
          onSubmit={formikObj.handleSubmit}
          className="w-[90%] bg-white dark:text-white mx-auto shadow-lg dark:bg-gray-950 dark:text-b rounded-lg p-5">
          <h1 className="text-center my-2  font-bold text-3xl">
            Forgot Password
          </h1>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Your email
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

          <button
            type="submit"
            className="text-white bg-[#0a1179] hover:bg-[blue] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
            Confirm
          </button>
        </form>
      ) : (
        <form
          onSubmit={formikobj2.handleSubmit}
          className="w-[90%] bg-white mx-auto shadow-lg dark:bg-white dark:text-b rounded-lg p-5">
          <h1 className="text-center my-2 text-black font-bold text-3xl">
            Enter Your verify Code
          </h1>
          <div className="mb-5">
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Your verify code
            </label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              onChange={formikobj2.handleChange}
              value={formikobj2.values.resetCode}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>

          <button
            type="submit"
            className="text-white bg-[#17f317] hover:bg-[#28da04] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
            Verify
          </button>
        </form>
      )}
    </div>
  );
}
