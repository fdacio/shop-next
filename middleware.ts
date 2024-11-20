import { AxiosError } from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { useApiPostSSR } from './app/lib/api/requests/ssr/useApiPost';
import { ApiResponseError, ApiUser } from './app/lib/api/types/entities';
import { clearCookie, getCookie } from './app/lib/cookies';

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;
    const isRouterLogin = pathname.startsWith('/login');
    const isRouterProfileCustomer = pathname.startsWith('/profile/customers');
    const isRouterAdministrative = pathname.startsWith('/administrative');

    //const token = request.cookies.get('shop.token');
    const cookieToken = await getCookie('shop.token');
    const token = cookieToken?.value;
    
    if (token) {
        
        const { user, error } = await authenticatedUser(token);

        if (error) {
            await clearCookie('shop.token');
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (user) {
            const isAdmin = userAdmin(user);
            const isOperator = userOperator(user);
            const isCustomer = userCustomer(user);

            if ((isAdmin || isOperator || isCustomer) && isRouterProfileCustomer) return NextResponse.next(); //continua com requisição para a rota

            if ((isAdmin || isOperator) && isRouterAdministrative) return NextResponse.next(); //continua com requisição para a rota

            if (isRouterLogin) return NextResponse.redirect(new URL('/', request.url));

        } 
    } 

    if (isRouterLogin) return NextResponse.next();

    return NextResponse.redirect(new URL('/', request.url));

}

// quando chamadas são para as rotas de dashboard dispara o  middleware
export const config = {
    matcher: ['/administrative/:path*', '/profile/customers/:path*', '/login'],
}

async function authenticatedUser(token: string) {

    let user: ApiUser | undefined;
    let error: ApiResponseError | undefined;

    try {

        const response = await useApiPostSSR<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token } });
        user = response.data;

    } catch (err: AxiosError | any) {
        error = { status: err.status, message: err.message, fields: [] };
    }

    return { user, error }

}

function userAdmin(user: ApiUser): boolean {
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "admin") {
            _return = true;
            return true;
        }
    })
    return _return;
}

function userOperator(user: ApiUser): boolean {
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "operator") {
            _return = true;
            return true;
        }
    })
    return _return;
}


function userCustomer(user: ApiUser): boolean {
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "customer") {
            _return = true;
            return true;
        }
    })
    return _return;
}