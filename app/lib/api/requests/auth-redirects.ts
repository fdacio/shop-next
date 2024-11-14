'use server'
import { redirect, RedirectType } from 'next/navigation'
import { ApiUser } from '../types/entities';

export async function redirectAfterSignIn(user : ApiUser) {

    user?.rules?.map((r: { nome: string; }) => {

        if (r.nome === 'Admin' || r.nome == 'Operator') {
            redirect('/administrative', RedirectType.replace);
        }

        if (r.nome === 'Customer') {
            redirect('/', RedirectType.replace);
        }
        
    })

}

export async function redirectSignOut() {
    redirect("/", RedirectType.replace);
}

export async function redirectRoot() {
    redirect("/", RedirectType.replace);
}

export async function redirectLogin() {
    redirect("/login", RedirectType.replace);
}
