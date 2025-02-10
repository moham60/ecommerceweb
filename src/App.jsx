import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Authentication from "./Components/AuthenticationContext/Authentication";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import ProtectedRoute2 from "./Components/Protected2/ProtectedRoute2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import CartProvider from "./Components/CartContext/CartProvider";
import ProductDetail from "./Components/ProductDetails/ProductDetail";
import WishList from "./Components/WishList/WishList";
import WishProvider from "./Components/WishListContext/WishProvider";

import Order from "./Components/Order/Order";
import ForgotPass from "./Components/forgotPassword/ForgotPass";
import ChangePass from "./Components/ChangePass/ChangePass";
import ProductsInBrand from "./Components/ProductWithSpecificBrand/ProductsInBrand";
import ProductwithCategory from "./Components/ProductwithCategory/ProductwithCategory";

const queryClient = new QueryClient({});
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },

      {
        path: "/forgotpass",
        element: <ForgotPass />,
      },
      {
        path: "/changePass",
        element: <ChangePass />,
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },

      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productsWithBrand/:brandId",
        element: (
          <ProtectedRoute>
            <ProductsInBrand />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productwithCategory/:categoryId",
        element: (
          <ProtectedRoute>
            <ProductwithCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute2>
            <Login />
          </ProtectedRoute2>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute2>
            <Register />
          </ProtectedRoute2>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Authentication>
          <CartProvider>
            <WishProvider>
              <RouterProvider router={router} />
            </WishProvider>
          </CartProvider>
        </Authentication>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
