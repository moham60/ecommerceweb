import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Aos from "aos";
import { Link } from "react-router-dom";
import shoppingCart from "../../assets/images/shopping-cart.png";
import useAddtoCart from "../../customHooks/useAddtoCart";
import { useContext, useEffect } from "react";
import { cartContext } from "./../Contexts/CartContext/CartProvider";

export default function Products() {
  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  useEffect(() => {
    Aos.init();
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["Product"],
    queryFn: getProducts,
  });

  const addtocart = useAddtoCart();
  const { isLoadingCartOperation } = useContext(cartContext);

  const allProduct = data?.data.data;

  return (
    <div className="dark:bg-black bg relative p-4">
      <div className="inpt  p-6">
        <input
          type="text"
          className="w-[80%]  mx-auto block rounded border-1 border-emerald-300   "
          placeholder="Search By Product Name"
          autoComplete="off"
        />
      </div>
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <div className="container mx-auto p-10">
        {isLoading && <LoaderScreen />}
        <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {allProduct &&
            allProduct.map((product) => (
              <Link
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
                data-aos-delay="100"
                data-aos-duration="1000"
                to={`/productDetails/${product._id}`}
                key={product._id}
                className="p-6  hover:shadow-emerald-300 transition-all duration-700 rounded-lg   bg-white dark:bg-gray-950 dark:text-white overflow-hidden group  cursor-pointer my-4 shadow-lg relative">
                <img className="w-full" src={product.imageCover} alt="" />
                <h2 className=" text-green-500">{product.category.name}</h2>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="flex items-center justify-between  pb-4">
                  <span>{product.price}EGP</span>
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      className=" text-yellow-300"
                    />
                    {product.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    addtocart(product._id);
                    e.preventDefault();
                  }}
                  className="bg-emerald-400 absolute group-hover:translate-y-0  left-[50%] translate-x-[-50%] transition-all bottom-2 translate-y-[150%] right-1 w-[80%]  p-1 text-white rounded-lg flex items-center justify-center ">
                  <span className="me-2">
                    <img className="w-6" src={shoppingCart} alt="" />
                  </span>
                  Add to cart
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
