import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import React from "react";
import Authentication from "./Components/AuthenticationContext/Authentication";
import CartProvider from "./Components/CartContext/CartProvider";
import WishProvider from "./Components/WishListContext/WishProvider";
const Home = React.lazy(() => import("./Components/Home/Home"));
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const Layout = React.lazy(() => import("./Components/Layout/Layout"));
const ProtectedRoute = React.lazy(() =>
  import("./Components/Protected/ProtectedRoute")
);
const Products = React.lazy(() => import("./Components/Products/Products"));
const WishList = React.lazy(() => import("./Components/WishList/WishList"));
const ForgotPass = React.lazy(() =>
  import("./Components/forgotPassword/ForgotPass")
);
const ChangePass = React.lazy(() =>
  import("./Components/ChangePass/ChangePass")
);
const Categories = React.lazy(() =>
  import("./Components/Categories/Categories")
);
const Brands = React.lazy(() => import("./Components/Brands/Brands"));
const Order = React.lazy(() => import("./Components/Order/Order"));
const ProductDetail = React.lazy(() =>
  import("./Components/ProductDetails/ProductDetail")
);
const ProductsInBrand = React.lazy(() =>
  import("./Components/ProductWithSpecificBrand/ProductsInBrand")
);
const ProductwithCategory = React.lazy(() =>
  import("./Components/ProductwithCategory/ProductwithCategory")
);
const ProtectedRoute2 = React.lazy(() =>
  import("./Components/Protected2/ProtectedRoute2")
);
const Login = React.lazy(() => import("./Components/Login/Login"));
const Register = React.lazy(() => import("./Components/Register/Register"));
const NotFound = React.lazy(() => import("./Components/NotFound/NotFound"));
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
