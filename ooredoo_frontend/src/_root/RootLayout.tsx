import { Outlet } from "react-router-dom";

import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import "../App.css"
import { useAuthStore } from "@/store/auth/AuthStore";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toprow } from "@/components/toprow/Toprow";
const RootLayout = () => {
    const { isAuthenticated } = useAuthStore();
    const invalidateQueryCache = () => {
        const queryClient = useQueryClient();
        queryClient.invalidateQueries();
    }

    useEffect(() => {
        if (!isAuthenticated) {
            invalidateQueryCache()
        }
    }, [isAuthenticated])

    return (
        <>
          {!isAuthenticated ? (
            <Navigate to="/login" />
          ) : (
            <>
              <Toprow />
              <Sidebar />
              <section className="py-10">
                <Outlet />
              </section>
              <Footer />
            </>
          )}
        </>
      )
    }
export default RootLayout;
