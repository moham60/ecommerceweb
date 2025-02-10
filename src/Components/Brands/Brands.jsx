import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { Link } from "react-router-dom";

export default function Brands() {
  async function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["Brands"],
    queryFn: getAllBrands,
  });

  const allBrands = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="dark:bg-gray-800  bg">
      <div className="container mx-auto p-10">
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {allBrands.map((e) => (
            <Link
              to={`/productsWithBrand/${e._id}`}
              key={e._id}
              className=" p-4 shadow-lg bg-gray-700 text-white cursor-pointer transition-all duration-[1s]
            hover:shadow-[green] dark:hover:shadow-[red] hover:cursor-pointer hover:scale-110      ">
              <img className="w-full" src={e.image} alt="" />
              <h2 className="text-center     font-bold md:text-2xl">
                {e.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
