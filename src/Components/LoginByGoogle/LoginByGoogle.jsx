import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { authenticateObj } from "../Contexts/AuthenticationContext/Authentication";
import LoaderScreen from "../LoaderScreen/LoaderScreen";

// eslint-disable-next-line react/prop-types
export default function LoginByGoogle({ values }) {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const { setToken } = useContext(authenticateObj);
  async function loginNewUser(values) {
    // try {
    //   const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
    //   console.log(data);

    // } catch (error) {
    //   console.log("error",error.response.data.message);
    // }
    setisloading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        setisloading(false);
        toast.success("welcome back", {
          duration: 2000,
          position: "top-center",
        });
        const navigateTohome = () => {
          navigate("/home");
        };
        navigateTohome();
        setToken(res.data.token);
        localStorage.setItem("tkn", res.data.token);
      })
      .catch((x) => {
        Swal.fire({
          title: "Oops!",
          text: x.response.data.message,
          icon: "error", // "error" shows the wrong icon
          button: "Try Again",
        });
        setisloading(false);
      });
  }
  const formikobj = useFormik({
    initialValues: {
      values,
    },
    onSubmit: (v) => {
      console.log("v", v);
      console.log(v.values);
      const resisterValues = {
        email: v.values.email,
        password: v.password,
      };
      console.log(resisterValues);
      loginNewUser(resisterValues);
      // loginNewUser(values);
    },
  });

  return (
    <div className="py-8 bg">
      {isloading ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <form
        className=" w-[90%] md:w-[50%] lg:w-[35%]  bg-white mx-auto shadow-lg dark:bg-black  dark:text-b rounded-lg p-5"
        onSubmit={formikobj.handleSubmit}>
        <h1 className="text-center dark:text-white my-2 text-black font-bold text-3xl">
          Login By Google Account
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            // eslint-disable-next-line react/prop-types
            value={values.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            onChange={formikobj.handleChange}
            onBlur={formikobj.handleBlur}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-[#0a1179] hover:bg-[blue] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center ">
          Login
        </button>
      </form>
    </div>
  );
}
