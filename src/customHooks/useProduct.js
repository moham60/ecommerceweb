import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProduct() {
  async function getAllProduct2() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const res = useQuery({
    queryKey: ["Product"],
    queryFn: getAllProduct2,
  });

  return res;
}
