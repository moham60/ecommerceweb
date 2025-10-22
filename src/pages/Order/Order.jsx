import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { cartContext } from "../../Contexts/CartContext/CartProvider";

export default function Order() {
  const { cartId, userId, resetValues, getUserOders } = useContext(cartContext);
  var values = {
    details: "",
    phone: "",
    city: "",
  };

  const [isCahed, setisCahed] = useState(true);

  function createCashOrder(values) {
    const res = axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Success to created order");
        getUserOders(userId);
        resetValues();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  }
  function checkOut(values) {
    const res = axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.open(res.data.session.url, "_self");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  }

  const formik = useFormik({
    initialValues: values,
    onSubmit: function (values) {
      if (isCahed) {
        createCashOrder(values);
      } else {
        checkOut(values);
      }
    },
  });

  return (
    <div className="py-10  dark:bg-gray-950 dark:text-white">
      <form
        onSubmit={formik.handleSubmit}
        className=" shadow-lg p-5 dark:bg-gray-950 bg-white dark:shadow-sm-light w-[50%] rounded-lg mx-auto">
        <h1 className="text-center font-bold md:text-3xl">Create Order</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.details}
            onChange={formik.handleChange}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your City
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your Phone
          </label>
        </div>
        <div className="btns flex flex-wrap gap-2">
          <button
            onClick={() => {
              setisCahed(true);
            }}
            type="submit"
            className="text-white   bg-[#0a1179] hover:bg-[blue]   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">
            Create order
          </button>
          <button
            onClick={() => {
              setisCahed(false);
            }}
            type="submit"
            className="  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-white bg-[#0a1179] hover:bg-[blue]  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:text-white ">
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}
