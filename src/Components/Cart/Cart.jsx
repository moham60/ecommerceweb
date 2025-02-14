import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./cart.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { cartContext } from "./../Contexts/CartContext/CartProvider";

export default function Cart() {
  const {
    numOfCartItems,
    totalCartPrice,
    products,
    updateCartQuantity,
    removeCartItem,
    deleteCartUser,
    isLoadingCartOperation,
  } = useContext(cartContext);
  const handleClick = async (count, id) => {
    const res = await updateCartQuantity(count, id);

    if (res === true) {
      setTimeout(
        () =>
          toast.success("count is Updated", {
            duration: 2000,
            position: "top-right",
          }),
        3000
      );
    } else if (res === false) {
      toast.error("error occured", {
        duration: 2000,
        position: "top-right",
      });
    }
  };
  async function handleRemoveCartItem(id) {
    const res = await removeCartItem(id);
    if (res === true) {
      toast.success("Cart item is deleted Sucessfuly", {
        duration: 1000,
        position: "top-right",
      });
    } else if (res === false) {
      toast.error("error occured", {
        duration: 1000,
        position: "top-right",
      });
    }
  }
  async function handleRemoveCart() {
    const res = await deleteCartUser();
    if (res === true) {
      toast.success("Cart Shopping is deleted Sucessfuly", {
        duration: 1000,
        position: "top-right",
      });
    } else if (res === false) {
      toast.error("error occured", {
        duration: 1000,
        position: "top-right",
      });
    }
  }

  return (
    <div className="cart relative dark:bg-gray-800">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <div className="container   mx-auto p-6">
        <h1 className="md:text-3xl text-center   my-4 font-bold  ">
          Your Cart
        </h1>
        <div className=" bg-gray-900 text-white text-center shadow-md  duration-700 hover:cursor-pointer hover:shadow-[green] w-[50%] mx-auto p-4 my-4 rounded-lg">
          <h2 className="text-2xl my-4 ">Total Price:{totalCartPrice}</h2>
          <h3 className="text-2xl my-4 ">cart count:{numOfCartItems} </h3>
        </div>

        <div className="relative overflow-x-auto  ">
          {products.length > 0 ? (
            <table className="w-[70%]   mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
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
                {products
                  ? products.map((product) => (
                      <tr
                        key={product._id}
                        className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title.split(" ", 2).join(" ")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => {
                                handleClick(
                                  product.count - 1,
                                  product.product.id
                                );
                              }}
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
                              -
                            </button>
                            <input
                              type="number"
                              value={product.count ?? 0} //??0 عشان انت لما بتدي فاليو بيكون controlled by react فلازم تديلو initial value
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              readOnly
                            />
                            <button
                              onClick={() => {
                                handleClick(
                                  product.count + 1,
                                  product.product.id
                                );
                              }}
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price}EGE
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              handleRemoveCartItem(product.product.id);
                            }}
                            className="font-medium rounded-lg border text-black border-[red] hover:bg-[red] p-2 dark:text-white hover:text-white">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
        {products.length > 0 ? (
          <div className="flex flex-col ">
            <button
              onClick={handleRemoveCart}
              className="w-[25%]  my-4 rounded-lg block mx-auto font-medium border text-black border-[red] hover:bg-[red] p-2  hover:text-white">
              delete Cart
            </button>
            <Link
              to="/order"
              className="w-[25%]  text-center my-4 rounded-lg block mx-auto font-medium border text-black hover:text-white border-[green] hover:bg-[green] p-2    ">
              Create Cash order
            </Link>
          </div>
        ) : (
          <div className="dark:text-white">No Product in cart</div>
        )}
      </div>
    </div>
  );
}
