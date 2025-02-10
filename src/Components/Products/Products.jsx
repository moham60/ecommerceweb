import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import useWish from "../../customHooks/useWish";
import { Link } from "react-router-dom";
import shoppingCart from "../../assets/images/shopping-cart.png";
import useAddtoCart from "../../customHooks/useAddtoCart";
import { useContext, useEffect, useRef } from "react";
import { cartContext } from "../CartContext/CartProvider";
import { authenticateObj } from "../AuthenticationContext/Authentication";
export default function Products() {
  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["Product"],
    queryFn: getProducts,
  });

  const { wishListArray, AddProductToWishlist, removeProductToWishlist } =
    useWish();

  const addtocart = useAddtoCart();
  const { isLoadingCartOperation } = useContext(cartContext);
  function handleWish(id) {
    var founded = false;

    wishListArray.map((product) => {
      if (product.id === id) {
        const res = removeProductToWishlist(id);
        localStorage.setItem("wishListArray", JSON.parse(wishListArray));
        if (res) {
          toast.success("success to remove from wish list");
          document.getElementById(id).classList.remove("toggole-heart");
        }

        founded = true;
      }
    });
    if (!founded) {
      const res = AddProductToWishlist(id);
      if (res) {
        toast.success("success to added to wish list");
        document.getElementById(id).classList.add("toggole-heart");
      }
    }
  }
  const { token } = useContext(authenticateObj);
  const elementRef = useRef(null);
  useEffect(() => {
    if (token) {
      if (elementRef) {
        {
          wishListArray?.map((product) => {
            var element = document.getElementById(product.id);
            if (element) {
              element.classList.add("toggole-heart");
            }
          });
        }
      }
    }
  }, [token]);

  const allProduct = data?.data.data;

  return (
    <div className="dark:bg-black bg relative p-4">
      <div className="inpt  p-6">
        <input
          type="text"
          className="w-[80%]  mx-auto block rounded border-1 border-[blue]   "
          placeholder="Search By Product Name"
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
                to={`/productDetails/${product._id}`}
                key={product._id}
                className="p-6 product  bg-white dark:bg-[#222] dark:text-white overflow-hidden group  cursor-pointer my-4 shadow-lg relative">
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
                  className="bg-[#17f317] absolute group-hover:translate-y-0  left-[50%] translate-x-[-50%] transition-all bottom-2 translate-y-[150%] right-1 w-[80%]  p-1 text-white rounded-lg flex items-center justify-center ">
                  <span className="me-2">
                    <img className="w-6" src={shoppingCart} alt="" />
                  </span>
                  Add to cart
                </button>
                <button
                  onClick={(e) => {
                    handleWish(product._id);
                    e.preventDefault();
                  }}
                  className="absolute  transition-all top-0 left-1 h-3 w-3 p-3  rounded flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeart} id={product._id} />
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
