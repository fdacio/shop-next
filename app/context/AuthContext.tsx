'use client'
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { createContext } from "react";
import { redirectSignIn, redirectSignOut } from '../lib/api/requests/auth-redirects';
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

    //Funcao do provider que faz o login
    async function signIn({ email : username, password }: SignInData) {

        destroyCookie(undefined, 'shop.token');

        let data = {
            "username": username,
            "password": password
        }

        const { data: token, error: errorLogin } = await useApiPost<Token>("/auth/login", data);

        if (errorLogin) {
            throw new ApiError(errorLogin.status, errorLogin.message);
        }

        if (token) {
            destroyCookie(undefined, 'shop.token');
            setCookie(undefined, 'shop.token', token?.token, {
                expires: token?.expired
            });
        }

        const { data: user, error: errorGetUser } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token?.token } });


        if (user) {
            await redirectSignIn(user);
        }

    }

    //Funcao do logout que faz o logout
    async function signOut() {
        console.log("Logout");
        destroyCookie(undefined, 'shop.token');
        await redirectSignOut();
    }

    //Função que retorna os dados do usuário logado
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
