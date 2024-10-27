import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useApiPost } from './app/lib/api/requests/ssr/useApiPost';
import { ApiUser } from './app/lib/api/types/entities';
import {destroyCookie } from 'nookies';

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl
    const token = request.cookies.get('shop.token');

    if (token?.value) {


        const user = await authenticatedUser(token.value);

        if (!user) return NextResponse.redirect(new URL('/login', request.url));

        // se tem token, porém não consegue obter o usuário pelo token (token exprired), redireciona para o login

        const isRouterResourceUsers = pathname.startsWith('/dashboard/users');
        const isRouterLogin = pathname.startsWith('/login');
        const isAdmin = userAdmin(user);
        const isOperator = userOperator(user);
        const isCustomer = userCustomer(user);

        console.log("isRouterResourceUsers: " + isRouterResourceUsers);
        console.log("isRouterLogin: " + isRouterLogin);
        console.log("isAdmin: " + isAdmin);
        console.log("isOperator: " + isOperator);
        console.log("isCustomer: " + isCustomer);

        if (isRouterLogin && (isAdmin || isOperator)) return NextResponse.redirect(new URL('/dashboard', request.url));

        if (isRouterLogin && (isCustomer)) return NextResponse.redirect(new URL('/', request.url));

        //if (isRouterResourceUsers && !isAdmin) return NextResponse.redirect(new URL('/dashboard', request.url));

        //if (isAdmin || isOperator) return NextResponse.redirect(new URL('/dashboard', request.url));

        // se o usuário logado custormer, redireciona para raiz do sistema (ponto de entrada do app)
        if (isCustomer) return NextResponse.redirect(new URL('/', request.url));

    } else {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// quando chamadas são para as rotas de dashboard dispara o  middleware
export const config = {
    matcher: ['/dashboard/:path*'],
    //matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

async function authenticatedUser(token: string) {
    const { data: user, error } = await useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + token } });
    if (error) {
        destroyCookie(undefined, 'shop.token');
    }
    return user;
}

function userAdmin(user: ApiUser) : boolean{
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "admin") {
            _return = true;
            return true;
        }
    })
    return _return;
}

function userOperator(user: ApiUser) : boolean {
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "operator") {
            _return = true;
            return true;
        }
    })
    return _return;
}


function userCustomer(user: ApiUser) : boolean {
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "customer") {
            _return = true;
            return true;
        }
    })
    return _return;
}