import { IUser } from "@/types";

export type AuthUser = {
    email: string;
    password: string;
}



export interface AuthState {
    user: IUser;
    isAuthLoading: boolean;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    setIsAuthLoading: (isAuthLoading: boolean) => void;
    setUser: (user: IUser) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    checkTokenExpiry: () => void;
    clearUserSession: () => void;
}

export const DEFAULT_USER: IUser = {
    user_id: '',
    name: '',
    email: ''
};