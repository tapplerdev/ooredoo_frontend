import { Outlet } from "react-router-dom";

import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import "../App.css"
const RootLayout = () => {
  return (
    <>
      <Sidebar />
        <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;