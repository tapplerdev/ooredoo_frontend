import './App.css';
import { Routes, Route } from "react-router-dom";
import AuthLayout from './_auth/AuthLayout';
import { Login } from './_auth/pages/Login/Login';
import RootLayout from './_root/RootLayout';
import { ListChannels } from './_root/pages/ListChannels';
import useInvalidateCacheOnAuthChange from './hooks/useInvalidateCacheOnAuthChange';
import { useAuthStore } from './store/auth/AuthStore';
import { Settings } from './_root/pages/Settings';
import { Audit } from './_root/pages/Audit';
function App() {
  // useInvalidateCacheOnAuthChange();
  // const { user,isAuthenticated,accessToken, checkTokenExpiry } = useAuthStore();
  // checkTokenExpiry();
  // // console.log(`Here is the entire session in one go now: ${JSON.stringify(user)}, authentication status: ${isAuthenticated}, accessToken: ${accessToken}`)
  // useInvalidateCacheOnAuthChange()
  return (
    <>
    <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<ListChannels />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/audit" element={<Audit />} />
        </Route>
    </Routes>
    </>
  );
}

export default App;