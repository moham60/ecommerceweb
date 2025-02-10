import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import shoppingCart from "../../assets/images/shopping-cart.png";
import { useContext } from "react";
import { cartContext } from "../CartContext/CartProvider";

import useAddtoCart from "../../customHooks/useAddtoCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export default function ProductsInBrand() {
  const { brandId } = useParams();

  const addTocart = useAddtoCart();
  const { isLoadingCartOperation } = useContext(cartContext);
  function getSpecificProductByBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        brand: brandId,
      },
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getSpecificProductsByBrand", brandId],
    queryFn: getSpecificProductByBrand,
  });
  const productwithBrand = data?.data.data;
  console.log(productwithBrand);
  function getBrandName() {
    var brandName;
    if (productwithBrand) {
      brandName = productwithBrand[0]?.brand?.name;
      console.log(brandName);
      if (brandName === undefined) {
        return "No items available";
      }
    }
    return brandName;
  }
  const brandName = getBrandName();
  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <div className=" min-h-[100vh]  p-4 relative dark:bg-black dark:text-white">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <h1 className="text-center   barndtitle relative  w-fit py-3  mx-auto my-10  text-4xl font-bold text-[#12d823] font-serif  rounded p-2">
        {brandName !== undefined
          ? `Product with category ${brandName}`
          : brandName}
      </h1>
      <div className="container grid   md:grid-cols-3 sm:grid-cols-2 gap-4 lg:grid-cols-4  mx-auto  py-16">
        {productwithBrand ? (
          productwithBrand.map((product) => (
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
