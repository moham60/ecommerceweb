import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { authenticateObj } from "../AuthenticationContext/Authentication.Jsx";
import toast from "react-hot-toast";
import "./Loginstyle.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(authenticateObj);
  let user = {
    email: "",
    password: "",
  };
  const [isloading, setisloading] = useState(false);

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
      });
  }
  const formikobj = useFormik({
    initialValues: {
      user,
    },
    onSubmit: loginNewUser,
    validationSchema: yup.object().shape({
      email: yup.string().email().required("email is required"),
      password: yup.string().required("password is required"),
    }),
  });

  return (
    <>
      <div className=" py-8 login    dark:bg-black dark:text-white">
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
            Login Now
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
              onChange={formikobj.handleChange}
              onBlur={formikobj.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
            {formikobj.errors.email && formikobj.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 mt-2 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-red-400 "
                role="alert">
                <span className="font-medium">{formikobj.errors.email}</span>
              </div>
            ) : (
              ""
            )}
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
            {formikobj.errors.password && formikobj.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 mt-2 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-red-400 "
                role="alert">
                <span className="font-medium">{formikobj.errors.password}</span>
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-[#17f317] hover:bg-[#28da04] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
            Login
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/forgotpass");
          }}
          className=" mt-4 text-2xl hover:underline hover:text-[#17f317]">
          Forgot your Password
        </button>
      </div>
    </>
  );
}
