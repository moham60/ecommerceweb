import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import useProduct from "../../customHooks/useProduct";
import shoppingCart from "../../assets/images/shopping-cart.png";
import useWish from "./../../customHooks/useWish";
import { authenticateObj } from "../AuthenticationContext/Authentication";
import useAddtoCart from "../../customHooks/useAddtoCart";
import { cartContext } from "../CartContext/CartProvider";

export default function Home() {
  // const [productList, setproductList] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  //   async function getAllProduct() {
  //     axios.get('https://ecommerce.routemisr.com/api/v1/products').then(
  //       (response)=>{
  //         setproductList(response.data.data);
  //         setLoading(false);
  //       }
  //     ).catch(
  //       (error)=>{
  //     console.log(error);
  //       }
  //     );

  // }
  // useEffect(() => {
  //   getAllProduct();

  // }, []);

  const { isLoading, data } = useProduct();
  const allProduct = data?.data.data;

  const { AddProductToWishlist, wishListArray, removeProductToWishlist } =
    useWish();
  const { token } = useContext(authenticateObj);
  const { isLoadingCartOperation } = useContext(cartContext);
  const addtocart = useAddtoCart();
  var storewishList = [];
  function handleWish(id) {
    var founded = false;
    wishListArray.map((product) => {
      if (product.id === id) {
        const res = removeProductToWishlist(id);
        if (res) {
          toast.success("success to remove from wish list");
          document.getElementById(id).classList.remove("toggole-heart");
        }

        founded = true;
      }
    });
    if (!founded) {
      const res = AddProductToWishlist(id);
      localStorage.setItem("wishStore", storewishList.push(id));
      if (res) {
        toast.success("success to added to wish list");
        document.getElementById(id).classList.add("toggole-heart");
      }
    }
  }
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

  return (
    <div className="dark:bg-black bg  relative dark:text-white ">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <div className=" container   mx-auto py-4  ">
        <HomeSlider />
        <CategoriesSlider />
        {isLoading && <LoaderScreen />}
        <h2 className=" font-bold m-3 md:text-3xl  dark:text-white text-black">
          Shop Product
        </h2>
        <div className="grid  lg:grid-cols-5 md:grid-cols-3  gap-2 md:gap-6">
          {allProduct &&
            allProduct.map((product) => (
              <Link
                to={`/productDetails/${product._id}`}
                key={product._id}
                className="p-6 product cursor-pointer dark:shadow-2xl dark:bg-[#222] dark:text-white overflow-hidden group my-2 shadow-lg  relative ">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full"
                />
                <h2 className=" text-green-500">{product.category.name}</h2>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>

                <div className="flex items-center justify-between pb-4">
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
                  </span>{" "}
                  Add to cart
                </button>
                <button
                  onClick={(e) => {
                    handleWish(product._id);
                    e.preventDefault();
                  }}
                  className="absolute  transition-all top-0 left-1 h-3 w-3 p-3  rounded flex items-center justify-center"
                  id={product._id}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
