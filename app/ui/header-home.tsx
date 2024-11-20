'use client'
import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ApiResponseError, ApiUser } from "../lib/api/types/entities"
import ApiMessageErro from "./api-messge-error"
import MenuUser from "./menu-user"
import ShopLogo from "./shop-logo"
import { useApiPost } from "../lib/api/requests/csr/useApiPost"
import { parseCookies } from "nookies"

export default function HeaderHome() {

    const [authUser, setAuthUser] = useState<ApiUser | undefined>(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [apiError, setApiError] = useState<ApiResponseError | undefined>(undefined);
    const { signOut } = useContext(AuthContext);

    const { 'shop.token': accessToken } = parseCookies(undefined);
    const { handlePost } = useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + accessToken } });

    useEffect(() => {
        const callPost = async () => {
            const { data, loading, error } = await handlePost();
            console.log(data, loading, error);
            setAuthUser(data);
            setLoadingUser(loading);
            setApiError(error);
        }
        callPost();
    }, []);


    const handlerSignOut = async () => {
        setAuthUser(undefined);
        await signOut();
    }


    return (
        <header>
            <div className="flex h-20 shrink-0 items-center justify-between rounded-md bg-color-shop p-4 md:h-40 ">
                <Link href="/"><ShopLogo /></Link>
                <p className='text-color-shop'>Bem-vindo ao Shop</p>
                <div className="relative md:self-end">

                    {
                        (loadingUser) ? <ClockIcon className="ml-1 w-4 text-white" /> :
                            (authUser) ?
                                <MenuUser user={authUser} handlerSignOut={handlerSignOut} />
                                :
                                <Link
                                    href="/login"
                                    className="flex items-center gap-5 md:self-end bg-color-shop text-sm font-medium text-color-shop transition-colors text-center md:text-base"
                                >
                                    <span>Entrar</span> <ArrowRightIcon className="w-5 md:w-6 " />
                                </Link >

                    }
                </div>
            </div>
            <ApiMessageErro message={apiError?.message} />
        </header>
    )
}
