import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import BasicModal from "../Model/Model";
import { useContext } from "react";
import { authenticateObj } from "../Contexts/AuthenticationContext/Authentication";

export default function Layout() {
  const { token } = useContext(authenticateObj);
  return (
    <>
      <Navbar />
      <div className="mt-20 md:mt-15 lg:mt-14">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>

      {token && (
        <div className="fixed top-[50%] right-1">
          <BasicModal />
        </div>
      )}
    </>
  );
}
