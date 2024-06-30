import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, DEFAULT_USER } from '@/store/auth/types'
import { jwtDecode } from 'jwt-decode'; // Make sure to install this package

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      isAuthLoading: false,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      setIsAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      checkTokenExpiry: () => {
        const { accessToken } = get();
        console.log('here is the accessToken ', accessToken)
        if (!accessToken) {
            return;
        }
        if (accessToken) {
          try {
            
            const decodedToken = jwtDecode<{ exp: number }>(accessToken);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
              // Token is expired
              console.log('Token expired!')
              set({ accessToken: null, refreshToken: null, isAuthenticated: false, user: DEFAULT_USER });
              localStorage.removeItem('auth-storage'); // Clear persisted storage
            }
          } catch (error) {
            // In case of an invalid token
            console.log('Token invalid!')
            set({ accessToken: null, refreshToken: null, isAuthenticated: false, user: DEFAULT_USER });
            localStorage.removeItem('auth-storage'); // Clear persisted storage
          }
        }
      },
      clearUserSession: () => {
        set({ accessToken: null, refreshToken: null, isAuthenticated: false, user: DEFAULT_USER });
        localStorage.removeItem('auth-storage');
      }
    }),
    {
      name: 'auth-storage', // unique name
      getStorage: () => localStorage, // you can use mmkv or other storage
    }
  )
);