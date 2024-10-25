'use client'
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useApiPost } from "../lib/api/useApiPost";
import { ApiError, ApiUser, Token } from "../lib/definitions";
import { redirectSignOut, redirectSignIn } from '../actions';
import axiosInstance from "../lib/api/axiosInstance";


type AuthContextType = {
    signIn: (data: SignInData) => Promise<boolean>,
    signOut: () => Promise<void>,
    authentocatedUser: () => Promise<ApiUser | undefined>,
    error: ApiError | null
}

type SignInData = {
    'email': string,
    'password': string
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {

    const [user, setUser] = useState<ApiUser | null>(null);
    const [error, setError] = useState<ApiError | null>(null);


    async function signIn({ email, password }: SignInData) {

        let loginData = {
            "username": email,
            "password": password
        }

        const { data: token, error: errorGetToken } = await useApiPost<Token>("/auth/login", loginData);


        if (token) {
            setCookie(undefined, 'shop.token', token?.token, {
                expires: token?.expired
            });
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token.token}`;
        }
        if (errorGetToken) {
            setError(errorGetToken);
            return false;
        }

        const { data: user, loading: loadingUser, error: errorGetUser } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token?.token } });

        if (errorGetUser) {
            setError(errorGetUser);
            return false;
        }

        if (user) {
            await redirectSignIn(user);

        }

        return true;

    }

    async function signOut() {
        setCookie(undefined, 'shop.token', "");
        await redirectSignOut();
    }

    async function authentocatedUser() {
        
        const { 'shop.token': token } = parseCookies();
        
        if (!token) return;

        const { data: user, error: errorGetUser } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token } });
        
        if(errorGetUser) {
            setError(errorGetUser);
            return;
        
        }
        return user
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, authentocatedUser, error }}>
            {children}
        </AuthContext.Provider>
    )

}
