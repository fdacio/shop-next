'use client'

import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ApiError } from "../lib/api/exceptions/ApiError"
import { ApiUser } from "../lib/api/types/entities"
import ApiMessageErro from "./api-messge-error"
import MenuUser from "./menu-user"
import ShopLogo from "./shop-logo"

export default function HeaderHome() {

    const { authenticatedUser } = useContext(AuthContext);
    const [authUser, setAuthUser] = useState<ApiUser | undefined>(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [apiError, setApiError] = useState<ApiError | undefined>(undefined);
    const { signOut } = useContext(AuthContext);

    useEffect(() => {

        const handleAuthenticatedUser = async () => {
            setLoadingUser(true);
            try {
                const user = await authenticatedUser();
                if (user) setAuthUser(user);
            } catch (err: any) {
                setApiError(err);
            }
            setLoadingUser(false);
        }

        handleAuthenticatedUser();

    }, [])

    const handlerSignOut = async () => {
        setAuthUser(undefined);
        await signOut();
    }

    
    return (
        <header>
            <div className="flex h-20 shrink-0 items-center justify-between rounded-md bg-color-shop p-4 md:h-40 ">
                <ShopLogo /> <p className='text-color-shop'>Bem Vindo ao Shop</p>
                {
                    (apiError) && <ApiMessageErro message={apiError?.message} />
                }
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
        </header>
    )
}