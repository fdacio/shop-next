'use client'
import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { parseCookies } from "nookies"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useApiPost } from "../lib/api/requests/csr/useApiPost"
import { ApiResponseError, ApiUser } from "../lib/api/types/entities"
import MenuUser from "./menu-user"
import ShopLogo from "./shop-logo"

export default function HeaderHome() {

    const [authUser, setAuthUser] = useState<ApiUser | undefined>(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [apiError, setApiError] = useState<ApiResponseError | undefined>(undefined);
    const { signOut } = useContext(AuthContext);

    const { 'shop.token': accessToken } = parseCookies(undefined);
    const { handlePost } = useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + accessToken } });

    useEffect(() => {
        const callPost = async () => {
            const { data: user, loading, error } = await handlePost();
            setAuthUser(user);
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
            <div className="flex h-20 shrink-0 items-center justify-between rounded-md bg-black-500 p-4 md:h-40 ">
                <div className="w-1/3 justify-items-start">
                    <Link href="/"><ShopLogo /></Link>
                </div>
                <div className="w-2/3 justify-items-center">
                    <p className='text-yellow-500'>Bem-vindo ao Shop</p>
                </div>
                <div className="relative md:self-end w-1/3 justify-items-end">

                    {
                        (loadingUser) ? <ClockIcon className="ml-1 w-4 text-white" /> :
                            (authUser) ?
                                <MenuUser user={authUser} handlerSignOut={handlerSignOut} />
                                :
                                <Link
                                    href="/login"
                                    className="flex items-center gap-5 md:self-end bg-black-500 text-sm font-medium text-yellow-500 transition-colors text-center md:text-base"
                                >
                                    <span>Entrar</span> <ArrowRightIcon className="w-5 md:w-6 " />
                                </Link >

                    }
                </div>
            </div>
        </header>
    )
}
