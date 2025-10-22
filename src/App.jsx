import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const queryClient = new QueryClient({});
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import ProtectedRoute2 from "./Components/Protected2/ProtectedRoute2";
import CartProvider from "./Contexts/CartContext/CartProvider";
import Cart from "./pages/Cart/Cart";
import  Products from "./pages/Products/Products"
import Authentication from "./Contexts/AuthenticationContext/Authentication";
import Layout from "./Components/Layout/Layout"
import ForgotPass from './Components/forgotPassword/ForgotPass';
import ChangePass from './Components/ChangePass/ChangePass';
import Categories from './pages/Categories/Categories';
import Brands from './pages/Brands/Brands';
import Order from './pages/Order/Order';
import ProductDetail from './pages/ProductDetails/ProductDetail';
import ProductsInBrand from './pages/ProductWithSpecificBrand/ProductsInBrand';
import ProductwithCategory from './pages/ProductwithCategory/ProductwithCategory';
import Login from './pages/Auth/Login/Login';
import Register from "./pages/Auth/Register/Register";
import NotFound from './pages/NotFound/NotFound';
import "react-loadly/styles.css"
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
    <>
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
    </>
    
  
  );
}

export default App;
