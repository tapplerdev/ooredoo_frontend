import { Outlet, Navigate } from "react-router-dom";
import Footer from "@/components/footer/Footer";
import { useAuthStore } from "@/store/auth/AuthStore";
import { useEffect } from "react";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-col justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <Footer />
        </>
      )}
    </>
  )
};