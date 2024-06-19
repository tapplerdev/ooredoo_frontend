// import { useNavigate } from "react-router-dom";
// import { createContext, useContext, useEffect, useState } from "react";

// import { IUser } from "@/types";


// export const INITIAL_USER = {
//   id: "",
//   username: "",
//   email: "",
// };

// const INITIAL_STATE = {
//   user: INITIAL_USER,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => {},
//   setIsAuthenticated: () => {},
//   checkAuthUser: async () => false as boolean,
//   accessToken: null,
//   refreshToken: null,
//   setAccessToken: () => '' as string,
//   setRefreshToken: () => '' as string,

// }; 

// type IContextType = {
//   user: IUser;
//   isLoading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => void;
//   accessToken?: string
//   refreshToken?: string
//   setAccessToken: (accessToken: string) => void;
// };

// const AuthContext = createContext<IContextType>(INITIAL_STATE);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<IUser>(INITIAL_USER);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const checkAuthUser = async () => {
//     setIsLoading(true);
//     setIsAuthenticated(prev => !prev)
//     // try {
//     //   let currentAccount = false;
//     //   setTimeout(() => {
//     //     currentAccount = true;
//     //   }, 1000);
//     //   if (currentAccount) {
//     //     setUser({
//     //       id: '1',
//     //       username: 'atajoe',
//     //       email: 'skie8erboy1@gmail.com',
//     //     });
//     //     setIsAuthenticated(true);

//     //     return true;
//     //   }

//     //   return false;
//     // } catch (error) {
//     //   console.error(error);
//     //   return false;
//     // } finally {
//     //   setIsLoading(false);
//     // }
//   };

//   useEffect(() => {
//     const cookieFallback = localStorage.getItem("cookieFallback");
//     if (
//       cookieFallback === "[]" ||
//       cookieFallback === null ||
//       cookieFallback === undefined
//     ) {
//       navigate("/login");
//     }

//     checkAuthUser();
//   }, []);


//   const value = {
//     user,
//     setUser,
//     isLoading,
//     isAuthenticated,
//     setIsAuthenticated,
//     checkAuthUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useUserContext = () => useContext(AuthContext);
