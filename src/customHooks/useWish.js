import { useContext } from "react";
import { wishContext } from "../Components/WishListContext/WishProvider";

export default function useWish() {
  const res = useContext(wishContext);
  return res;
}
