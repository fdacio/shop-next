import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { Token, ApiUser } from '@/app/lib/definitions';
import { useApiPost } from './app/lib/api/useApiPost';

async function getUser(email: string, password: string): Promise<ApiUser | undefined> {
    
    try {
        type Login = {
            'username': string,
            'password': string
        }

        let login: Login = {
            username: email,
            password: password
        };

        //Aqui fazer as chamadas para a API de auth
        const { data: token, loading: loadingToken, error: errorGetToken } = await useApiPost<Token>("/auth/login", login);

        if (errorGetToken != undefined) {
            throw new AuthError("", {cause: errorGetToken.message});
        }
        
        const { data: user, loading: loadingUser, error: errorGetUser } = await useApiPost<ApiUser>("auth/user/authenticated", {}, {headers:{'Authorization' : 'Bearer ' + token?.token}});

        if (errorGetUser != undefined) {
            throw new AuthError("", {cause: errorGetUser.message});
        }
        
        return user;


    } catch (err: any) {
        throw err;
    }
}


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email, password);
                    if (!user) return null;

                    console.log(" *** USER LOGADO ***");
                    console.log(user);
                    return user
                }

                console.log('Invalid credentials');
                return null;
            }
        }),
    ],

});

