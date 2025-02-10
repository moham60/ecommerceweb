import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../CartContext/CartProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddtoCart from "../../customHooks/useAddtoCart";
import shoppingCart from "../../assets/images/shopping-cart.png";

export default function ProductwithCategory() {
  const { categoryId } = useParams();
  const addTocart = useAddtoCart();
  const { isLoadingCartOperation } = useContext(cartContext);
  function getSpecificProductBycategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        category: categoryId,
      },
    });
  }
  const { data, isLoading } = useQuery({
    queryKey: ["getSpecificProductBycategory", categoryId],
    queryFn: getSpecificProductBycategory,
  });
  if (isLoading) {
    return <LoaderScreen />;
  }
  function getCategoryName() {
    var catgoryName;
    if (
      productwithcategory !== null ||
      productwithcategory.length > 0 ||
      productwithcategory !== undefined
    ) {
      catgoryName = productwithcategory[0]?.category?.name;
      if (catgoryName === undefined) {
        return "No items available";
      }
    }
    return catgoryName;
  }
  const productwithcategory = data?.data.data;
  const catgoryName = getCategoryName();
  return (
    <div className=" min-h-[100vh]  p-4 relative dark:bg-black dark:text-white">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <h1 className="text-center text-[#12d823] font-serif  barndtitle relative  w-fit py-3  mx-auto my-10  text-4xl font-bold  rounded p-2">
        {catgoryName !== undefined
          ? `Product with category ${catgoryName}`
          : catgoryName}
      </h1>
      <div className="container grid   md:grid-cols-3 sm:grid-cols-2 gap-4 lg:grid-cols-4  mx-auto  py-16">
        {productwithcategory ? (
          productwithcategory.map((product) => (
            <div
              key={product.id}
              className="hover:scale-110 transition-all p-4 shadow-lg hover:shadow-[#17f317] cursor-pointer duration-500 ">
              <Link to={`/productDetails/${product.id}`} className=" ">
                <img src={product.imageCover} alt="" />

                <h2 className="my-2 text-2xl">
                  title: {product.title.split(" ", 2)}
                </h2>
                <div className="flex p-2  justify-between items-center">
                  <h3 className=" text-xl">
                    price:{" "}
                    <span className="text-[#17f317]">{product.price}</span>
                  </h3>
                  <h3>
                    <span className="text-[#ffdf27]">
                      {" "}
                      <FontAwesomeIcon icon={faStar} />
                      {product.ratingsAverage}
                    </span>
                  </h3>
                </div>
              </Link>
              <button
                onClick={() => {
                  addTocart(product.id);
                }}
                className="w-full border border-[#17f317] hover:bg-[#17f317] hover:text-white flex items-center justify-center transition-all duration-300 my-4 p-2 rounded">
                <span className="me-2">
                  <img className="w-6" src={shoppingCart} alt="" />
                </span>{" "}
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <div>No products provided with this Brand</div>
        )}
      </div>
    </div>
  );
}
