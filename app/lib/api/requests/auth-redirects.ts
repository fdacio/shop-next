'use server'
import { redirect, RedirectType } from 'next/navigation'
import { ApiUser } from '../types/entities';

export async function redirectSignIn(user : ApiUser) {

    user?.rules?.map((r: { nome: string; }) => {


        if (r.nome === 'Admin' || r.nome == 'Operator') {
            redirect('/dashboard', RedirectType.push);
        }

        if (r.nome === 'Customer') {
            redirect('/', RedirectType.push);
        }
    })

}

export async function redirectSignOut() {
    redirect("/logout");
}

export async function redirectRoot() {
    redirect("/");
}

export async function redirectLogin() {
    redirect("/login");
}
