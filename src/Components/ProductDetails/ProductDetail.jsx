import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import useAddtoCart from "../../customHooks/useAddtoCart";
import { cartContext } from "./../Contexts/CartContext/CartProvider";
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

  return (
    <>
      <div className="dark:bg-black dark:text-white bg">
        {isLoadingCartOperation ? (
          <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
            {<LoaderScreen />};
          </div>
        ) : (
          ""
        )}
        <div className="container relative p-10 mx-auto">
          <div className="flex flex-col bg-white shadow-lg px-2 py-6 dark:bg-gray-900 dark:text-white rounded-lg gap-5 md:flex-row items-center ">
            <div className="lg:w-1/4   md:w-1/3 w-3/4 mb-4">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}>
                {detailsProduct.images.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    id={index}
                    className="carousel-item w-full cursor-pointer">
                    <img src={img} className="w-full" alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="lg:w-3/4 md:w-2/3 w-full px-4">
              <h1 className=" mb-3 md:text-xl">{detailsProduct.title}</h1>
              <p className="text-gray-400 dark:text-gray-200">
                {detailsProduct.description}
              </p>
              <p className="my-2">
                Category:{" "}
                <span className="text-emerald-300">
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
                className="py-4 w-full text-black border border-emerald-500 hover:bg-emerald-900 dark:text-white hover:text-white transition-all duration-[0.8s] mt-4 rounded ">
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
