import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import shoppingCart from "../../assets/images/shopping-cart.png";
import { useContext, useEffect } from "react";

import useAddtoCart from "../../customHooks/useAddtoCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { cartContext } from "./../Contexts/CartContext/CartProvider";
import Aos from "aos";
export default function ProductsInBrand() {
  const { brandId } = useParams();
  useEffect(() => {
    Aos.init();
  }, []);
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
    <>
      {productwithBrand.length > 0 ? (
        <div className=" min-h-[100vh]   relative dark:bg-black dark:text-white">
          {isLoadingCartOperation ? (
            <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
              {<LoaderScreen />};
            </div>
          ) : (
            ""
          )}
          <div className=" text-center  mt-6 py-5">
            <h1 className="barndtitle relative     text-4xl font-bold dark:text-emerald-300 font-serif  rounded p-2">
              {brandName}
            </h1>
          </div>

          {
            <div className="grid  justify-center   md:grid-cols-3 sm:grid-cols-2 gap-4 lg:grid-cols-4    py-16">
              {productwithBrand.length > 0 ? (
                productwithBrand.map((product) => (
                  <Link
                    to={`/productDetails/${product._id}`}
                    data-aos="fade-up"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="100"
                    data-aos-duration="1000"
                    key={product.id}
                    className=" transition-all bg-white rounded-lg dark:bg-gray-950 relative p-4 shadow-lg hover:shadow-emerald-300  cursor-pointer duration-500 ">
                    <div to={`/productDetails/${product.id}`} className=" ">
                      <img src={product.imageCover} alt="" />

                      <h2 className="my-2 text-2xl">
                        title: {product.title.split(" ", 1)}
                      </h2>
                      <div className="flex p-2  justify-between items-center">
                        <h3 className=" text-xl">
                          price:{" "}
                          <span className="text-emerald-300">
                            {product.price}
                          </span>
                        </h3>
                        <h3>
                          <span className="text-[#ffdf27]">
                            {" "}
                            <FontAwesomeIcon icon={faStar} />
                            {product.ratingsAverage}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addTocart(product.id);
                      }}
                      className="w-full border border-emerald-300 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all duration-300 my-4 p-2 rounded">
                      <span className="me-2">
                        <img className="w-6" src={shoppingCart} alt="" />
                      </span>{" "}
                      Add to cart
                    </button>
                  </Link>
                ))
              ) : (
                <div>No products provided with this Brand</div>
              )}
            </div>
          }
        </div>
      ) : (
        <div className="noProduct h-screen relative dark:bg-black dark:text-white  flex items-center justify-center">
          <h1 className="barndtitle relative     text-4xl font-bold dark:text-emerald-300 font-serif  rounded p-2">
            {brandName}
          </h1>
        </div>
      )}
    </>
  );
}
