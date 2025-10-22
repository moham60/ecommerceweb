import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mt-20 min-h-screen bg bg-white dark:bg-gray-950 flex flex-col  justify-center   md:mt-15 lg:mt-14">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>

     
    </>
  );
}
