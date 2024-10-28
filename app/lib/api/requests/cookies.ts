"use server"
import { cookies } from 'next/headers'

export async function cookiesServer(){
    return cookies();
};