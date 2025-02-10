import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useParams } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { cartContext } from "../CartContext/CartProvider";

import Slider from "react-slick";
import useAddtoCart from "../../customHooks/useAddtoCart";

export default function ProductDetail() {
  const { id } = useParams();
  const { isLoadingCartOperation } = useContext(cartContext);
  async function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const addTocart = useAddtoCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });
  const detailsProduct = data?.data.data;
  console.log(detailsProduct);
  if (isLoading) {
    return <LoaderScreen />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="dark:bg-black dark:text-white bg">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <div className="container relative p-10 mx-auto">
        <div className="grid gap-6 items-center  lg:grid-cols-4">
          <div className=" col-span-1">
            <Slider {...settings} autoplay>
              {detailsProduct.images.map((img) => (
                <div key={img}>
                  <img src={img} alt="" />
                </div>
              ))}
            </Slider>
          </div>
          <div className=" col-span-3">
            <h1 className=" mb-3 md:text-xl">{detailsProduct.title}</h1>
            <p className="text-gray-400 dark:text-gray-200">
              {detailsProduct.description}
            </p>
            <p className="my-2">
              Category:{" "}
              <span className="text-emerald-800">
                {detailsProduct.category.name}
              </span>
            </p>
            <div className="flex justify-between">
              <span>{detailsProduct.price} EGP</span>
              <span>
                <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                {detailsProduct.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => addTocart(id)}
              className="py-4 w-full text-black border border-[green] hover:bg-[green] dark:text-white hover:text-white transition-all duration-[0.8s] mt-4 rounded ">
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
