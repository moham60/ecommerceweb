import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../../Contexts/CartContext/CartProvider";
import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    numOfCartItems,
    totalCartPrice,
    products,
    updateCartQuantity,
    removeCartItem,
    deleteCartUser,
    isLoadingCartOperation,
  } = useContext(cartContext);
  const handleClick = async (count, id) => {
    if (count > 0) {
       const res = await updateCartQuantity(count, id);
    }
   

    if (res === true) {
      setTimeout(
        () =>
          toast.success("count is Updated", {
            duration: 2000,
            position: "top-right",
          }),
        3000
      );
    } else if (res === false) {
      toast.error("error occured", {
        duration: 2000,
        position: "top-right",
      });
    }
  };
  async function handleRemoveCartItem(id) {
    const res = await removeCartItem(id);
    if (res === true) {
      toast.success("Cart item is deleted Sucessfuly", {
        duration: 1000,
        position: "top-right",
      });
    } else if (res === false) {
      toast.error("error occured", {
        duration: 1000,
        position: "top-right",
      });
    }
  }
  async function handleRemoveCart() {
    const res = await deleteCartUser();
    if (res === true) {
      toast.success("Cart Shopping is deleted Sucessfuly", {
        duration: 1000,
        position: "top-right",
      });
    } else if (res === false) {
      toast.error("error occured", {
        duration: 1000,
        position: "top-right",
      });
    }
  }
  function getPriceSummary() {
   
        const orginalPrice = totalCartPrice
    const tax = parseInt(orginalPrice / 9);
    const saving = parseInt(orginalPrice * 0.10);
     const totalPrice = orginalPrice + tax-saving;
     
  

     return {orginalPrice,tax,totalPrice,saving}

  }
    const sammryPrice=getPriceSummary()
 
 
  return (
    <div className=" relative bg ">
      {isLoadingCartOperation ? (
        <div className="fixed z-10 flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-[#e9dede8c]">
          {<LoaderScreen />};
        </div>
      ) : (
        ""
      )}
     <section className="bg-white py-8 min-h-screen antialiased bg dark:bg-gray-950 md:py-16">
  <div className="mx-auto px-4 2xl:px-0">
    <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-white sm:text-3xl">Shopping Cart</h2>

    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {products?.length > 0 ?
                  products.map(product => (
                  <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                 <img src={ product.product.imageCover} alt={product.product.title} className="w-20 h-20" />
              </a>

              <label for="counter-input" className="sr-only">Choose quantity:</label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button onClick={()=>handleClick(product.count - 1,product.product._id)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={product.count} required />
                  <button onClick={()=>handleClick(product.count+1,product.product._id)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">${product.price}</p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p  className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.product.title}</p>

                <div className="flex items-center gap-4">
                  <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Favorites
                  </button>

                  <button onClick={()=>handleRemoveCartItem(product.product._id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
                  )) :
                  <div className="h-64 flex items-center justify-center" >
                    <p className="dark:text-white text-center text-4xl font-bold">No Product In Your Cart</p>
                  </div>
              }
          
         
        
        </div>
       
      </div>
            {products.length > 0 && <>
                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${sammryPrice.orginalPrice}
                      </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">-${ sammryPrice.saving}</dd>
              </dl>

             

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">${sammryPrice.tax}</dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">cartItems count</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">{ numOfCartItems}</dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-500 dark:text-gray-400">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">${sammryPrice.totalPrice}</dd>
                    </dl>
                 
          </div>

                  <Link to={"/order"} className="flex w-full bg-blue-600 hover:bg-blue-700 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout
                    
            </Link>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </a>
          </div>
        </div>

       
            </div>
              </>
            }
     
           
          </div>
          {products.length>0&&<button onClick={handleRemoveCart} className="rounded my-2  dark:text-white hover:text-white dark:hover:text-black p-4 border border-red-800 hover:border-red-800 dark:border-red-600 dark:hover:bg-red-600">Remove Cart Item</button>}
           
  </div>
</section>
    </div>
  );
}
