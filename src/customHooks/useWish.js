import { useContext } from "react";
import { wishContext } from "../Components/Contexts/WishListContext/WishProvider";

export default function useWish() {
  const res = useContext(wishContext);
  return res;
}
