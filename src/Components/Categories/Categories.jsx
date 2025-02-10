import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  async function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isLoading, data } = useQuery({
    queryKey: ["Categories"],
    queryFn: getAllCategories,
  });
  const allCategories = data?.data.data;
  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="dark:bg-black bg">
      <div className="container mx-auto py-10">
        <div className="grid  gap-8 items-center text-center  md:grid-cols-3 lg:grid-cols-4">
          {allCategories.map((category) => (
            <Link
              to={`/productwithCategory/${category._id}`}
              key={category._id}
              className=" transition-all duration-[1s]
              bg-gray-700
              h-96
              my-4
            hover:shadow-[green] dark:hover:shadow-[red] hover:cursor-pointer hover:scale-110 shadow-sm p-5">
              <img className="w-56" src={category.image} alt={category.name} />
              <h2 className="font-bold text-white text-xl p-2">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
