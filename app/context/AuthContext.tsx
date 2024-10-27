'use client'
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { createContext } from "react";
import { redirectSignIn, redirectSignOut } from '../auth-redirects';
import { useApiPost } from "../lib/api/requests/ssr/useApiPost";
import { ApiUser, Token } from "../lib/api/types/entities";
import { ApiError } from '../lib/api/exceptions/ApiError';


type AuthContextType = {
    signIn: (data: SignInData) => Promise<void>,
    signOut: () => Promise<void>,
    authenticatedUser: () => Promise<ApiUser | undefined>,
}

type SignInData = {
    'email': string,
    'password': string
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {

    async function signIn({ email, password }: SignInData) {

        destroyCookie(undefined, 'shop.token');

        let loginData = {
            "username": email,
            "password": password
        }

        const { data: token, error : errorLogin } = await useApiPost<Token>("/auth/login", loginData);

        if (errorLogin) {
            throw new ApiError(errorLogin.status, errorLogin.message)
        }

        if (token) {
            destroyCookie(undefined, 'shop.token');
            setCookie(undefined, 'shop.token', token?.token, {
                expires: token?.expired
            });
            //axiosInstance.defaults.headers['Authorization'] = `Bearer ${token.token}`;
        }

        const { data: user, error : errorGetUser } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token?.token } });


        if (user) {
            await redirectSignIn(user);
        }

    }

    async function signOut() {
        destroyCookie(undefined, 'shop.token');
        await redirectSignOut();
    }

    async function authenticatedUser() {

        const { 'shop.token': token } = parseCookies();

        if (!token) return;

        const { data: user, error } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token } });

        if (error) {
            destroyCookie(undefined, 'shop.token');
            throw new ApiError(error.status, error.message)
        }

        return user
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, authenticatedUser }}>
            {children}
        </AuthContext.Provider>
    )

}
