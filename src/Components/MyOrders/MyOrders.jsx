import { useContext, useEffect } from "react";

import { cartContext } from "../Contexts/CartContext/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LoaderScreen from "../LoaderScreen/LoaderScreen";

export default function MyOrders() {
  const { userOrders, getUserOders, isLoadingCartOperation } =
    useContext(cartContext);
  useEffect(() => {
    getUserOders();
  }, []);
  if (isLoadingCartOperation) {
    return <LoaderScreen />;
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg text-center dark:bg-black">
      <div className="conatiner mx-auto py-10 ">
        <div className="flex items-center flex-col   justify-center flex-wrap gap-4">
          {userOrders ? (
            userOrders.map((order) => (
              <div
                key={order.id}
                className=" items-center w-[90%] bg-gray-700 p-4 bg   grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4   text-white ">
                {order.cartItems.map((prod) => (
                  <div
                    key={prod.id}
                    className="shadow-lg bg-gray-900    gap-4  p-4">
                    <img
                      className="w-full block mx-auto"
                      src={prod.product.imageCover}
                      alt=""
                    />
                    <div className="flex  items-center justify-between pb-4">
                      <h2 className=" text-green-500">
                        Category: {prod.product.category.name}
                      </h2>
                      <h2>
                        title: {prod.product.title.split(" ", 2).join(" ")}
                      </h2>
                    </div>

                    <div className="flex items-center justify-between pb-4">
                      <span>{prod.price}EGP</span>
                      <span>
                        <FontAwesomeIcon
                          icon={faStar}
                          className=" text-yellow-300"
                        />
                        {prod.product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-6xl font-bold">No order</p>
          )}
        </div>
      </div>
    </div>
  );
}
