import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import shoppingCart from "../../assets/images/shopping-cart.png";
import { authenticateObj } from './../../Contexts/AuthenticationContext/Authentication';
import { FaMoon, FaSun } from "react-icons/fa6";
export default function Navbar() {
  const { token, setToken } = useContext(authenticateObj); 
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const handleNavigteToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("dark"))) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", true);
      setDarkMode(true);
    }
  }, []);
  const toggleMode = () => {
    localStorage.setItem("dark", !darkMode);
    setDarkMode(JSON.parse(localStorage.getItem("dark")));

    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav className="bg-white border-gray-200   dark:bg-[#030712]   fixed w-full z-20 top-0 left-0 right-0 border-b dark:border-b-gray-900">
      <div className="max-w-screen-xl flex  flex-wrap  nav    items-center  justify-between  p-4">
        <Link to="/" className="flex  items-center gap-1  ">
          <img className="w-7" src={shoppingCart} alt="" />
          <span className="block dark:text-white w-[140px] font-meduim text-2xl  p-2">
            Fresh Cart
          </span>
        </Link>

        {/* زر الهامبرغر */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isNavOpen}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            {isNavOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        <div
          className={`items-center justify-between ${
            isNavOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky">
          <ul
            className="flex items-center flex-col
           md:flex-row w-full md:w-auto p-4 md:p-0 mt-4 md:mt-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-transparent  dark:text-white md:dark:bg-transparent dark:border-gray-800  dark:bg-black gap-4 md:gap-6">
            {token ? (
              <>
                <li>
                  <NavLink to="/home" className="nav-link p-2 rounded-lg">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="nav-link p-2 rounded-lg">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="nav-link p-2 rounded-lg">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className="nav-link p-2 rounded-lg">
                    Brands
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to="/cart" className="nav-link p-2 rounded-md">
                    Cart
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="nav-link p-2 rounded-lg">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="nav-link p-2 rounded-lg">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <button
                onClick={toggleMode}
                className="block w-full text-center p-2 dark:text-white text-black rounded-md hover:bg-gray-200 hover:text-gray-600 dark:hover:text-yellow-200 dark:hover:bg-gray-700 transition">
                {darkMode ? <FaSun  size={25} /> : <FaMoon size={25} />}
              </button>
            </li>
            {token && (
              <li>
                <button
                  onClick={() => {
                    handleNavigteToLogin();
                    setToken(null);
                    localStorage.removeItem("tkn");
                  }}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
