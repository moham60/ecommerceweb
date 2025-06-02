import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import BasicModal from "../Model/Model";

export default function Layout() {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <Footer />
      <div className="fixed top-[50%] right-1">
        <BasicModal />
      </div>
    </div>
  );
}
