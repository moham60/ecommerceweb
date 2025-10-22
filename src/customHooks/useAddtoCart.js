import { useContext } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../Contexts/CartContext/CartProvider";

export default function useAddtoCart() {
  const { addtoCart } = useContext(cartContext);
  const addtocart = (id) => {
    const res = addtoCart(id);
    if (res) {
      setTimeout(
        () =>
          toast.success("it is Added to cart", {
            duration: 2000,
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
  };
  return addtocart;
}
