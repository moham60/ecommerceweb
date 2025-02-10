import { useContext } from "react";

import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartProvider";
import useWish from "../../customHooks/useWish";

import "./wishList.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { wishContext } from "../WishListContext/WishProvider";

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
        <h1 className="font-bold my-4 md:text-2xl">Favorities Products</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishListArray &&
                wishListArray.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}EGP
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap justify-center items-center gap-2">
                        <button
                          onClick={() => {
                            handleRemoveWish(product._id);
                          }}
                          className="font-medium rounded-lg border text-black border-[red] hover:bg-[red] p-2 dark:text-white hover:text-white ">
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            handleaddTocart(product._id);
                          }}
                          className="font-medium rounded-lg border text-black border-[green] hover:bg-[green] p-2 dark:text-white hover:text-white ">
                          Add to cart
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
