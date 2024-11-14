'use client'
import { clearCookie, getCookie, createCookie } from '@/app/lib/cookies';
import { createContext } from "react";
import { redirectAfterSignIn, redirectSignOut } from '../lib/api/requests/auth-redirects';
import { useApiPostSSR } from "../lib/api/requests/ssr/useApiPost";
import { useApiPost } from "../lib/api/requests/csr/useApiPost";
import { ApiUser, Token } from "../lib/api/types/entities";
import { ApiAuthError } from '../lib/api/exceptions/ApiAuthError';


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

    async function signIn({ email: username, password }: SignInData) {

        await clearCookie("shop.token");

        let data = {
            "username": username,
            "password": password
        }

        const { data: dataToken, error: errorLogin } = await useApiPostSSR<Token>("/auth/login", data, { withCredentials: false });

        if (errorLogin) {
            throw new ApiAuthError(errorLogin.status, (errorLogin.message ? errorLogin.message : ""));
        }

        if (dataToken) {
            await createCookie('shop.token', dataToken.token);
        }

        const { data: user, error: errorGetUser } = await useApiPostSSR<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + dataToken.token } });


        if (user) {
            await redirectAfterSignIn(user);
        }

    }

    //Funcao signOut que faz o logout
    async function signOut() {
        await clearCookie("shop.token");
        await redirectSignOut();
    }

    //Função que retorna os dados do usuário logado
    async function authenticatedUser() {

        const cookieToken = await getCookie('shop.token');
        const token = cookieToken?.value;

        if (!token) return;

        const { data: user, error } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token } });

        if (error) {
            throw new ApiAuthError(error.status, error.message ? error.message : "")
        }

        return user
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, authenticatedUser }}>
            {children}
        </AuthContext.Provider>
    )

}
