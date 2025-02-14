import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authenticateObj } from "./../AuthenticationContext/Authentication";

export const cartContext = createContext();

// eslint-disable-next-line react/prop-types
export default function CartProvider({ children }) {
  const { token } = useContext(authenticateObj);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [products, setproducts] = useState([]);
  const [cartId, setcartId] = useState(null);
  const [userId, setuserId] = useState(null);
  const [isLoadingCartOperation, setisloading] = useState(false);
  const [userOrders, setuserOrders] = useState(null);
  const [isOrderCreated, setisOrderCreated] = useState(false);
  async function addtoCart(id) {
    setisloading(true);
    const res = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(() => {
        setisloading(false);
        getUserCartData();
        return true;
      })
      .catch((error) => {
        console.log(error);
        setisloading(false);
        return false;
      });
    return res;
  }
  function getUserCartData() {
    setisloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res);
        setisloading(false);
        setuserId(res.data.data.cartOwner);
        setcartId(res.data.cartId);
        setnumOfCartItems(res.data.numOfCartItems);
        setproducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);

        return true;
      })
      .catch((error) => {
        setisloading(false);
        console.log(error);

        return false;
      });
  }
  async function getUserOders() {
    setisloading(true);
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setisloading(false);
        setuserOrders(res.data);
        console.log(res.data);
        setisOrderCreated(true);
        return true;
      })
      .catch((error) => {
        setisloading(false);

        console.log(error);

        return false;
      });
  }

  useEffect(() => {
    if (token) {
      getUserCartData();
      if (userId) {
        getUserOders();
      }
    }
  }, [token, userId]);
  async function updateCartQuantity(count, id) {
    setisloading(true);
    const res = axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        setisloading(false);
        setnumOfCartItems(res.data.numOfCartItems);
        setproducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);

        return true;
      })
      .catch((eror) => {
        console.log(eror);
        setisloading(false);
        return false;
      });
    return res;
  }
  async function removeCartItem(id) {
    setisloading(true);
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setisloading(false);
        setnumOfCartItems(res.data.numOfCartItems);
        setproducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);

        return true;
      })
      .catch((eror) => {
        console.log(eror);
        setisloading(false);
        return false;
      });
    return res;
  }
  async function deleteCartUser() {
    setisloading(true);
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then(() => {
        setproducts([]);
        setisloading(false);
        setnumOfCartItems(0);
        settotalCartPrice(0);

        return true;
      })
      .catch(() => {
        setisloading(false);
        return false;
      });
    return res;
  }
  function resetValues() {
    settotalCartPrice(0);
    setnumOfCartItems(0);
    settotalCartPrice(0);
    setproducts([]);
  }

  return (
    <cartContext.Provider
      value={{
        addtoCart,
        getUserCartData,
        totalCartPrice,
        numOfCartItems,
        products,
        updateCartQuantity,
        removeCartItem,
        deleteCartUser,
        cartId,
        resetValues,
        userId,
        isLoadingCartOperation,
        getUserOders,
        userOrders,
        isOrderCreated,
      }}>
      {children}
    </cartContext.Provider>
  );
}
