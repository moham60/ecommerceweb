import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import Aos from "aos";
import { Link } from "react-router-dom";
import shoppingCart from "../../assets/images/shopping-cart.png";
import useAddtoCart from "../../customHooks/useAddtoCart";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Contexts/CartContext/CartProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaStar } from "react-icons/fa6";
import { useFormik } from "formik";
import RatingProduct from "../../Components/RatingProduct/RatingProduct";

export default function Products() {
  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  useEffect(() => {
    Aos.init();
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["Product"],
    queryFn: getProducts,
  });

  const addtocart = useAddtoCart();
  const { isLoadingCartOperation } = useContext(cartContext);
  const allProducts = data?.data.data;
  const [displayedProducts, setdisplayedProducts] = useState([]);
  useEffect(() => {
  if (allProducts) {
    setdisplayedProducts(allProducts);
  }
}, [allProducts]);
  const handleFilteration = (values) => {
      if (!allProducts) return;

  let filtered = [...allProducts]; // دايمًا ابدأ من الأصل

    // فلترة السعر
    if (values.fromPrice && values.toPrice) {
    filtered = filtered.filter(
      (item) =>
        item.price >= parseInt(values.fromPrice) &&
        item.price <= parseInt(values.toPrice)
    );
    }  
    //filter category
      if (values.category !== "all") {
    filtered = filtered.filter((item) =>
      item.category.name.includes(values.category)
    );
    }
    setdisplayedProducts(filtered)
    
  }
  const filterValues = {
    fromPrice: "",
    toPrice: "",
    category: "all",
  }
  const filterInpts = useFormik({
    initialValues: filterValues,
    onSubmit:handleFilteration
  })

  return (
    <div className="dark:bg-black bg p-4 relative">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
        <div className="searchInpt my-7">
          <input type="text" placeholder="Search About Product by name" className="w-full rounded-lg dark:text-white dark:bg-gray-900 p-3 border dark:border-gray-800 border-gray-100 bg-white " />
        </div>
      <div className=" mt-1 p-4">
        {isLoading && <LoaderScreen />}
      
        <div className=" flex  items-start  gap-4">
          
          <form onSubmit={filterInpts.handleSubmit} className="filter p-4 w-full dark:text-white bg-[#ececec62]  shadow-lg lg:w-[30%] dark:bg-[#141414da] rounded-lg   ">
            <h4 className=" text-xl md:text-3xl font-bold">Filter Products</h4>
            <div className="priceInp my-4 ">
              <h5 >Price</h5>
              <div className="inpts my-2 flex items-center flex-col sm:flex-row gap-4">
                <input type="text" onChange={filterInpts.handleChange} name="fromPrice"  value={filterInpts.values.fromPrice} className="rounded-lg w-full bg-white dark:text-gray-400 text-gray-900" placeholder="from" />
              <input type="text" onChange={filterInpts.handleChange} name="toPrice" value={filterInpts.values.toPrice}  className="rounded-lg w-full bg-white dark:text-gray-400 text-gray-900" placeholder="to" />
              </div>
              
            </div>
            <div className="category my-2">
               <h5 >Category Name</h5>
              <select name="category" onChange={filterInpts.handleChange}  id="category" value={filterInpts.values.category}
                className="w-full rounded-lg dark:text-gray-400 my-2"
                
              >
                   <option value="all" className="dark:bg-gray-900">
                      All
                 </option>
              <option value={"Women's Fashion"} className="dark:bg-gray-900  " >
                     Women's Fashion
                </option>
                <option value={"Men's Fashion"} className="dark:bg-gray-900  " >
                   Men's Fashion
                </option>
                <option value={"Electronics"} className="dark:bg-gray-900  " >
                     Electronics
                  </option>
                
            </select>
            </div>
            <div className="rank my-2">
              <RatingProduct/>
            </div>
            <button type="submit" className="rounded-md  border border-blue-500 hover:bg-blue-600 p-2 hover:text-white">Show Products</button>
          </form>
           <div className=" products lg:flex-1  grid gap-6 lg:grid-cols-4  sm:grid-cols-2">
            {displayedProducts &&   
            displayedProducts.map((product) => (
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
                />

                <h2 className=" text-green-500">{product.category.name}</h2>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="flex items-center justify-between  pb-4">
                  <span>{product.price}EGP</span>
                   <span className="flex items-center"> 
                       <FaStar className="text-yellow-300"/>
                    {product.ratingsAverage}</span>
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
            )) 
              
            }
          </div>
          
        </div>
        
       
      </div>
    </div>
  );
}
