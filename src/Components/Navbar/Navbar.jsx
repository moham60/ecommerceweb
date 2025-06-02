import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authenticateObj } from "../Contexts/AuthenticationContext/Authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartShopping,
  faGear,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { cartContext } from "../Contexts/CartContext/CartProvider";
import shoppingCart from "../../assets/images/shopping-cart.png";
export default function Navbar() {
  const { token, setToken } = useContext(authenticateObj);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();

  const [mode, setMode] = useState("system"); // Default to system

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (localStorage.getItem("theme") === "dark") {
      htmlElement.classList.add("dark");
      setMode("dark");
    } else if (localStorage.getItem("theme") === "light") {
      htmlElement.classList.remove("dark");
      setMode("light");
    } else {
      // System mode
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        htmlElement.classList.add("dark");
        setMode("dark");
      } else {
        htmlElement.classList.remove("dark");
        setMode("light");
      }
    }
  }, [mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };
  const dropDownShow = () => {
    document.querySelector(".dropDown").classList.toggle("hidden");
    document.querySelector(".dropDown").classList.toggle("flex");
  };

  return (
    <>
      <nav className="shadow-xl bg     dark:bg-emerald-950 dark:text-white ">
        <div className="max-w-screen-xl flex flex-wrap  sm:flex-nowrap    items-center gap-2 p-4">
          <Link to="/" className="flex items-center gap-1  ">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ fontSize: "17px", color: "rgb(2 253 295)" }}
            />
            <span className="block w-[140px] font-meduim text-2xl  p-2">
              Fresh Cart
            </span>
          </Link>
          <button
            onClick={() => {
              document
                .getElementById("navbar-default")
                .classList.toggle("hidden");
            }}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 ms-auto justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700   dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block  " id="navbar-default">
            <div className=" flex flex-col md:flex-row gap-4 md:justify-between justify-center md:items-center">
              {token ? (
                <div className="left">
                  <ul className="font-medium flex flex-wrap  flex-col md:flex-row    p-4 md:p-0   ">
                    <li className="my-2 ms-1">
                      <NavLink
                        to="home"
                        className=" py-2 px-3 dark:text-white   text-black"
                        aria-current="page">
                        Home
                      </NavLink>
                    </li>

                    <li className="my-2 ms-1">
                      <NavLink
                        to="products"
                        className=" py-2 px-3 dark:text-white  text-black">
                        Products
                      </NavLink>
                    </li>
                    <li className="my-2 ms-1">
                      <NavLink
                        to="categories"
                        className="  py-2 px-3  dark:text-white text-black">
                        Categories
                      </NavLink>
                    </li>
                    <li className="my-2 ms-1">
                      <NavLink
                        to="brands"
                        className=" py-2 px-3  dark:text-white text-black">
                        Brands
                      </NavLink>
                    </li>
                    <li className="my-2 ms-1">
                      <NavLink
                        to="myorders"
                        className=" py-2 px-3  dark:text-white text-black">
                        my Orders
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}

              <div className="right flex md:ms-auto flex-wrap p-2 flex-col md:flex-row items-center  gap-4   ">
                <ul className="flex dark:text-black flex-1    justify-center items-center gap-3 flex-wrap">
                  {token ? (
                    <div className=" relative z-0">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative inline-flex items-center p-3 text-sm font-medium text-center ">
                          <img className="w-6" src={shoppingCart} alt="" />

                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-emerald-700  rounded-full -top-2 -end-2 dark:border-gray-900">
                            <span>{numOfCartItems}</span>
                          </div>
                        </button>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  <li>
                    <div className="border border-emerald-700 dark:text-white text-black z-10  hover:text-white hover:bg-emerald-700   dark:hover:bg-emerald-700 rounded-lg p-2  relative">
                      <button className="" onClick={dropDownShow}>
                        Choose Mode
                      </button>
                      <div className="dropDown   p-2 rounded-lg  absolute  hidden  left-[50%]  top-[50px] translate-x-[-50%] dark:text-white bg-white  dark:bg-black   flex-col">
                        <button
                          onClick={() => handleModeChange("light")}
                          className="px-2 py-1 mt-2 rounded-lg flex items-center gap-3 bg-gray-950 text-white">
                          <FontAwesomeIcon icon={faSun} />
                          <span>LightMode</span>
                        </button>
                        <button
                          onClick={() => handleModeChange("dark")}
                          className="px-2 py-1 mt-2 rounded-lg flex items-center gap-3 bg-gray-950 text-white">
                          <FontAwesomeIcon icon={faMoon} />
                          <span>DarkMode</span>
                        </button>
                        <button
                          onClick={() => handleModeChange("system")}
                          className="px-2 py-1 mt-2 rounded-lg flex items-center gap-3 bg-gray-950 text-white">
                          <FontAwesomeIcon icon={faGear} />
                          <span>SystemMode</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="flex  items-center gap-4 flex-wrap">
                  {token ? (
                    <li>
                      <span
                        onClick={() => {
                          setToken(null);
                          localStorage.removeItem("tkn");
                          navigate("login");
                        }}
                        className="cursor-pointer">
                        LogOut
                      </span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <NavLink to="register" className="p-2">
                          Register
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="login" className="p-2">
                          Login
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
