'use server'
import { cookies } from 'next/headers'

export async function createCookie(chave : string, valor :string) {
    const cookieStore = cookies();  
    cookieStore.set(chave, valor);
}

export async function getCookie(chave : string) {
    const cookieStore = cookies();  
    return cookieStore.get(chave);
}

export async function clearCookie(chave : string) {
    const cookieStore = cookies();  
    cookieStore.delete(chave);
}
