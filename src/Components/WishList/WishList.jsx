import { useContext } from "react";

import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartProvider";
import useWish from "../../customHooks/useWish";
import shoppingCart from "../../assets/images/shopping-cart.png";

import "./wishList.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { wishContext } from "../Contexts/WishListContext/WishProvider";
import { Link } from "react-router-dom";

export default function WishList() {
  const { removeProductToWishlist, wishListArray } = useWish();
  const { addtoCart } = useContext(cartContext);
  function handleRemoveWish(id) {
    const res = removeProductToWishlist(id);
    if (res) {
      setTimeout(
        () =>
          toast.success("success to delete from wishList", {
            duration: 1000,
            position: "top-right",
          }),
        2000
      );
    } else {
      toast.error("error occured", {
        duration: 1000,
        position: "top-right",
      });
    }
  }
  function handleaddTocart(id) {
    const res = addtoCart(id);
    if (res) {
      setTimeout(
        () =>
          toast.success("success to add to cart", {
            duration: 1000,
            position: "top-right",
          }),
        3000
      );
    } else {
      toast.error("error occured", {
        duration: 2000,
        position: "top-right",
      });
    }
  }
  const { isloadingWish } = useContext(wishContext);
  const { isLoadingCartOperation } = useContext(cartContext);
  return (
    <div className="bg dark:bg-black">
      <div className="container relative wishList  mx-auto py-10">
        {isloadingWish ? (
          <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
            {<LoaderScreen />};
          </div>
        ) : (
          ""
        )}
        {isLoadingCartOperation ? (
          <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
            {<LoaderScreen />};
          </div>
        ) : (
          ""
        )}
        <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {wishListArray.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 product relative rounded p-5 text-white">
              <img className="w-full" src={product.imageCover} alt="" />
              <h2>{product.title.split(" ", 2).join(" ")}</h2>
              <div>
                <p className="flex items-center gap-2">
                  Price:
                  {product.priceAfterDiscount ? (
                    <div className="flex items-center gap-1">
                      <span className="line-through">{product.price}EGP</span>
                      <span>{product.priceAfterDiscount}EGP</span>
                    </div>
                  ) : (
                    <span>{product.price}EGP</span>
                  )}
                </p>
              </div>
              <div className="flex items-center mt-4 justify-between">
                <button
                  onClick={(e) => {
                    handleaddTocart(product._id);
                    e.preventDefault();
                  }}
                  className="bg-[#17f317]   p-1 text-white rounded-lg flex items-center justify-center ">
                  <span className="me-2">
                    <img className="w-6" src={shoppingCart} alt="" />
                  </span>
                  Add to cart
                </button>
                <button
                  onClick={(e) => {
                    handleRemoveWish(product._id);
                    e.preventDefault();
                  }}
                  className=" p-2 bg-[red]  rounded flex items-center justify-center">
                  remove
                </button>
                <Link
                  to={`/productDetails/${product._id}`}
                  className="absolute right-1 top-0 hover:text-[red] transition-all duration-500">
                  <i className="fa-solid fa-eye"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
