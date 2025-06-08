import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { lazy, Suspense, useContext, useEffect } from "react";
const HomeSlider = lazy(() => import("../HomeSlider/HomeSlider"));
const CategoriesSlider = lazy(() =>
  import("../CategoriesSlider/CategoriesSlider")
);
import { Link } from "react-router-dom";

import useProduct from "../../customHooks/useProduct";
import shoppingCart from "../../assets/images/shopping-cart.png";

import useAddtoCart from "../../customHooks/useAddtoCart";
import { cartContext } from "./../Contexts/CartContext/CartProvider";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Aos from "aos";

export default function Home() {
  // const [productList, setproductList] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  //   async function getAllProduct() {
  //     axios.get('https://ecommerce.routemisr.com/api/v1/products').then(
  //       (response)=>{
  //         setproductList(response.data.data);
  //         setLoading(false);
  //       }
  //     ).catch(
  //       (error)=>{
  //     console.log(error);
  //       }
  //     );

  // }
  // useEffect(() => {
  //   getAllProduct();

  // }, []);
  useEffect(() => {
    Aos.init();
  }, []);
  const { data } = useProduct();
  const allProduct = data?.data.data;

  const { isLoadingCartOperation } = useContext(cartContext);
  const addtocart = useAddtoCart();

  return (
    <div className="dark:bg-black bg  relative dark:text-white">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
      <div className=" container   mx-auto py-4  ">
        <Suspense>
          <HomeSlider />
          <CategoriesSlider />
        </Suspense>

        <h2 className=" font-bold m-3 md:text-3xl  dark:text-white text-black">
          Shop Product
        </h2>
        <div className="grid p-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  gap-2 md:gap-6">
          {allProduct &&
            allProduct.map((product) => (
              <Link
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
                data-aos-delay="100"
                data-aos-duration="1000"
                to={`/productDetails/${product._id}`}
                key={product._id}
                className="p-6  hover:shadow-emerald-300 transition-all duration-700 rounded-lg   bg-white dark:bg-gray-950 dark:text-white overflow-hidden group  cursor-pointer my-4 shadow-lg relative">
                <LazyLoadImage
                  visibleByDefault={false}
                  className="w-full  object-cover mb-4"
                  src={product.imageCover}
                  alt={product.title}
                  height="300"
                  width="300"
                />

                <h2 className=" text-green-500">{product.category.name}</h2>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="flex items-center justify-between  pb-4">
                  <span>{product.price}EGP</span>
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      className=" text-yellow-300"
                    />
                    {product.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    addtocart(product._id);
                    e.preventDefault();
                  }}
                  className="bg-[green] absolute group-hover:translate-y-0  left-[50%] translate-x-[-50%] transition-all bottom-2 translate-y-[150%] right-1 w-[80%]  p-1 text-white rounded-lg flex items-center justify-center ">
                  <span className="me-2">
                    <img className="w-6" src={shoppingCart} alt="" />
                  </span>
                  Add to cart
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
