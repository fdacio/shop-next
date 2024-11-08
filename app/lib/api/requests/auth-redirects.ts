'use server'
import { redirect, RedirectType } from 'next/navigation'
import { ApiUser } from '../types/entities';

export async function redirectAfterSignIn(user : ApiUser) {

    user?.rules?.map((r: { nome: string; }) => {


        if (r.nome === 'Admin' || r.nome == 'Operator') {
            redirect('/administrative', RedirectType.push);
        }

        if (r.nome === 'Customer') {
            redirect('/', RedirectType.push);
        }
    })

}

export async function redirectSignOut() {
    redirect("/", RedirectType.push);
    //NextResponse.redirect(new URL('/'));
}

export async function redirectRoot() {
    redirect("/", RedirectType.push);
    //return NextResponse.redirect(new URL('/'));
}

export async function redirectLogin() {
    redirect("/login");
}
