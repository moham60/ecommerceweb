import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import React, { lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CartProvider = React.lazy(() =>
  import("./Components/Contexts/CartContext/CartProvider")
);
const Authentication = lazy(() =>
  import("./Components/Contexts/AuthenticationContext/Authentication")
);
const MyOrders = lazy(() => import("./Components/MyOrders/MyOrders"));
const Home = React.lazy(() => import("./Components/Home/Home"));
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const Layout = React.lazy(() => import("./Components/Layout/Layout"));
const ProtectedRoute = React.lazy(() =>
  import("./Components/Protected/ProtectedRoute")
);
const Products = React.lazy(() => import("./Components/Products/Products"));
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
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        path: "/myorders",
        element: (
          <ProtectedRoute>
            <MyOrders />
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
const clientGoogleId =
  "251669549089-4tpjd60lc8fg1vl8l8rsfgtgbtbjf18j.apps.googleusercontent.com";
function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-xl">
          جاري التحميل...
        </div>
      }>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientGoogleId}>
          <Authentication>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </Authentication>
        </GoogleOAuthProvider>
      </QueryClientProvider>
      <Toaster />
    </Suspense>
  );
}

export default App;
