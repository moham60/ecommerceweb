import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import "./register.css";

export default function Register() {
  const navToLogin = useNavigate();

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function registerUser(values) {
    // try {
    //   const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
    //   console.log(data);

    // } catch (error) {
    //   console.log("error",error.response.data.message);
    // }

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(() => {
        toast.success("welcome back", {
          duration: 2000,
          position: "top-center",
          icon: "👏",
        });
        const navigateToLogin = () => {
          setTimeout(() => {
            navToLogin("/login");
          }, 3000);
        };
        navigateToLogin();
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
    onSubmit: registerUser,
    // validate: function (values) {
    //   let errors = {};
    //   let regex = {
    //     rgname: /^[A-Z][a-z]{3,8}$/,
    //     rgemail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/ig,
    //     rgphone: /^(20)?01[0125][0-9]{8}$/,
    //     regxpass:/^\d{6,}$/
    //   }
    //   if (!regex.rgname.test(values.name)) {
    //     errors.name = 'Name Must be start with Capital and  3 charachter or more';
    //   }
    //    if (!regex.rgemail.test(values.email)) {
    //     errors.email = 'email is not valid';
    //   }
    //    if (!regex.rgphone.test(values.phone)) {
    //     errors.phone = 'phone must be egyptian number';
    //   }
    //    if (!regex.regxpass.test(values.password)) {
    //     errors.pass = 'Name Must be more than 6 charachters';
    //   }
    //   if (values.password!==values.repassword) {
    //     errors.pass2 = 'Re passoword is not identical';
    //   }

    //   return errors;
    // },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(3, "Name Must be three Characters or More")
        .max(14, "Name Must be less than 14 characters")
        .required("Name is required"),
      password: yup
        .string()
        .min(6, "Password must be 6 charachters or more")
        .max(20, "Password is very large must be less than Characters")
        .required("password is required"),
      email: yup
        .string()
        .email("email is not Valid")
        .required("email is required"),
      rePassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must be match")
        .required("Please confirm your password"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^(20)?01[0125][0-9]{8}$/, "Phone must be Egptian Number"),
    }),
  });
  return (
    <div className="py-8 register  dark:bg-black dark:text-white ">
      <form
        className="  w-[90%] md:w-[50%] lg:w-[35%] dark:bg-black  bg-white shadow-lg p-6 rounded-lg mx-auto"
        onSubmit={formikobj.handleSubmit}>
        <h1 className="text-center my-2  font-bold text-3xl">Register Now</h1>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Name
          </label>
          <input
            onChange={formikobj.handleChange}
            type="text"
            id="name"
            value={formikobj.initialValues.name}
            onBlur={formikobj.handleBlur}
            name="name"
            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formikobj.errors.name && formikobj.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 mt-2 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-red-400 "
              role="alert">
              <span className="font-medium">{formikobj.errors.name}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>
          <input
            onChange={formikobj.handleChange}
            type="email"
            value={formikobj.initialValues.email}
            onBlur={formikobj.handleBlur}
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            Your Password
          </label>
          <input
            onChange={formikobj.handleChange}
            type="password"
            id="password"
            value={formikobj.initialValues.password}
            onBlur={formikobj.handleBlur}
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <div className="mb-5">
          <label
            htmlFor="repassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            rePassword
          </label>
          <input
            onChange={formikobj.handleChange}
            onBlur={formikobj.handleBlur}
            type="password"
            id="repassword"
            value={formikobj.initialValues.rePassword}
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formikobj.errors.rePassword && formikobj.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 mt-2 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-red-400 "
              role="alert">
              <span className="font-medium">{formikobj.errors.rePassword}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone
          </label>
          <input
            onChange={formikobj.handleChange}
            type="tel"
            id="phone"
            name="phone"
            value={formikobj.initialValues.phone}
            onBlur={formikobj.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formikobj.errors.phone && formikobj.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 mt-2 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-red-400 "
              role="alert">
              <span className="font-medium">{formikobj.errors.phone}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
          Register
        </button>
      </form>
    </div>
  );
}
