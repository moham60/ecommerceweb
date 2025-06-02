import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authenticateObj } from "../AuthenticationContext/Authentication";

export const wishContext = createContext();
// eslint-disable-next-line react/prop-types
export default function WishProvider({ children }) {
  const { token } = useContext(authenticateObj);
  const [wishListNumber, setwishlistNumber] = useState(0);
  const [wishListArray, setwishListArray] = useState(null);
  const [isloadingWish, setisloadingWish] = useState(false);
  async function AddProductToWishlist(id) {
    setisloadingWish(true);
    const res = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then(() => {
        setisloadingWish(false);
        getLogedUserWishlist();
        return true;
      })
      .catch((eror) => {
        setisloadingWish(false);
        console.log(eror);
        return false;
      });
    return res;
  }
  async function getLogedUserWishlist() {
    const res = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res);
        setwishListArray(res.data.data);
        localStorage.setItem("wishListArray", JSON.stringify(res.data.data));
        setwishlistNumber(res.data.count);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  }
  async function removeProductToWishlist(id) {
    setisloadingWish(true);
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token,
        },
      })
      .then(() => {
        getLogedUserWishlist();
        setisloadingWish(false);
        return true;
      })
      .catch((eror) => {
        console.log(eror);
        setisloadingWish(false);
        return false;
      });
    return res;
  }
  useEffect(() => {
    if (token) {
      getLogedUserWishlist();
    }
  }, [token]);
  return (
    <wishContext.Provider
      value={{
        wishListNumber,
        AddProductToWishlist,
        removeProductToWishlist,
        wishListArray,
        isloadingWish,
      }}>
      {children}
    </wishContext.Provider>
  );
}
