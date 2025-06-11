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
  console.log(userOrders);

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg text-center dark:bg-black">
      <div className="conatiner mx-auto py-10 ">
        <div className="flex items-center flex-col   justify-center flex-wrap gap-4">
          {userOrders ? (
            userOrders.map((order, index) => (
              <div
                key={order.id}
                className=" items-center w-[90%]  bg-white  shadow-lg dark:bg-gray-950 p-4    grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4   dark:text-white ">
                <div className="info bg-slate-700 text-white dark:bg-black p-4">
                  <h2 className="text-lg ">Order{index + 1}</h2>
                  <h3>Owner: {order.shippingAddress.details}</h3>
                  <h4>Address: {order.shippingAddress.city}</h4>
                  <h5>Phone: {order.shippingAddress.phone}</h5>
                </div>

                {order.cartItems.map((prod) => (
                  <div
                    key={prod.id}
                    className="shadow-lg bg-white dark:bg-gray-900    gap-4  p-4">
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
            <p className="text-6xl font-bold dark:text-white">No order</p>
          )}
        </div>
      </div>
    </div>
  );
}
