import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
export const Root = () => {
    return (
        <>
        <h1>This is the root component.</h1>
        <div>
            <Sidebar />
            <Outlet />
        </div>
        </>
    )
}
