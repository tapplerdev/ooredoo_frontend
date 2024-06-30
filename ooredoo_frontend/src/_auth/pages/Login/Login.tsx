
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidation } from "@/lib/validation";
import { useUserSignIn } from "@/lib/react-query/queries";
import { useAuthStore } from "@/store/auth/AuthStore";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types";
import ooredooimg from "@/assets/ooredoo.png";
import { LoaderComponent } from "@/components/loader/LoaderComponent";
import { AuthRequest } from "@/store/auth/types";
export const Login = () => {
const navigate = useNavigate();
const { 
    isAuthenticated, 
    setAccessToken, 
    setUser, 
    setIsAuthenticated, 
    setIsAuthLoading, 
    isAuthLoading 
    } = useAuthStore();

const { mutateAsync: useSignInAccount } = useUserSignIn();
const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof SigninValidation & AuthRequest>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDecodedToken = (token: string) => {
    const decodedToken = jwtDecode<IUser>(token);
    const { email, user_id, name } = decodedToken;
    return {
        email,
        user_id,
        name
    }
  } 

const handleLogin = async (user: z.infer<typeof SigninValidation & AuthRequest>) => {
    // setIsAuthLoading(true);
    const session = await useSignInAccount({...user, userType: "admin"});
    setIsAuthLoading(false);
    if (!session) {
        return;
    }
    const { token } = session;
    const authenticatedUser = handleDecodedToken(token);
    setAccessToken(token)
    setUser(authenticatedUser)
    setIsAuthenticated(true)
    if (isAuthenticated) {
       navigate("/")
    }
}

console.log('here is isauthloading: ', isAuthLoading)

// if (isAuthLoading) {
//     return <LoaderComponent />
// }
return (
    <div className="min-h-screen flex  justify-center bg-gray-100">
        <div className="w-96 max-w-md p-1">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex items-center justify-center">
                <img src={ooredooimg} className="object-scale-down h-20 cursor-pointer" />
            </div>
            <div className="mb-4">
            <input
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                {...register("email")}
                placeholder="Email"
            />
            <br />
            {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
            </div>
            <div className="mb-6">
            <input
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                {...register("password")}
                placeholder="Password"
            />
            {errors.password && (
                <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}
            </div>
            <div className="flex items-center justify-center">
            <button
                type="submit"
                className="bg-ooredoo-primary hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out cursor-pointer border border-gray-300 w-full"
            >
                Sign In
            </button>
            </div>
        </form>
        </div>
  </div>
)
}