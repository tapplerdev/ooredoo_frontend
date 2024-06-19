import { Outlet, Navigate } from "react-router-dom";
import Footer from "@/components/footer/Footer";
import { useAuthStore } from "@/store/auth/AuthStore";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  console.log('here is isauthenticated from authlayout: ', isAuthenticated)
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <Footer />
        </>
      )}
    </>
  )
};