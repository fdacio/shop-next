'use client'

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { ApiMethod, useApi } from "../lib/useApi";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function AuthUser() {


    const { callback, data : user, loading, error } = useApi<User>(ApiMethod.POST, "auth/user/authenticated");
    const router = useRouter();
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const handlePost = async () => {
            if (callback == undefined) return;
            await callback({});
            setAuthUser(user);
        }
        handlePost();
    }, []);

    const _doLogout = () => {
        console.log("_doLogout");
        localStorage.setItem("token", "");
        setAuthUser(null);
        //router.push("/");
    }

    return (
        <div className="text-color-shop">
            {(loading) && <>Carregando</>}

            {(user) ?
                <div className="flex items-center gap-5 m-2">
                    {user?.nome}<button className="bg-color-shop p-2 rounded" onClick={_doLogout}><span>Sair</span></button>
                </div>
                :
                <Link
                    href="/login"
                    className="flex items-center gap-5 self-end bg-color-shop text-sm font-medium text-color-shop transition-colors md:text-base"
                >
                    <span>Entrar</span> <ArrowRightIcon className="w-5 md:w-6 text-color" />
                </Link >
            }
        </div>
    );

}