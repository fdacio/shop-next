import { useContext, useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { ApiUser } from '../lib/api/types/entities';
import { redirectRoot } from '../lib/api/requests/auth-redirects';
import { PowerIcon } from '@heroicons/react/24/outline';

export interface MenuItem {
    title: string;
    route?: string;
    children?: MenuItem[];
}

function userAdmin(user: ApiUser): boolean {
    let _return = false
    user?.rules?.map((r: { nome: string; }) => {
        if (r.nome.toLowerCase() === "admin") {
            _return = true;
            return true;
        }
    })
    return _return;
}

export default function MenuUser({ user, handlerSignOut }: { user: ApiUser, handlerSignOut: any }) {

    const { handleSubmit } = useForm();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isAdmin = userAdmin(user);

    const routeDashboard = isAdmin ? {
        title: "Área Administrativa",
        route: "/administrative"
    } : {
        title: "",
        route: ""
    }

    const menuItems = [
        {
            title: "Meus Dados",
            route: "/profile/customers/edit"
        },
        {
            title: "Alterar Senha",
            route: "/profile/customers/password"
        },
        routeDashboard
    ];



    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen ? "flex" : "hidden";



    return (
        <>
            <div className="relative md:self-end">
                <div className="flex flex-row gap-2">
                    <button className="text-white md:text-base" onClick={toggle}>{user.nomeSobrenome}</button>
                    <form onSubmit={handleSubmit(handlerSignOut)}>
                        <button className="flex gap-2">
                            <div className="hover:bg-color-shop-400 text-color-shop">Sair</div>
                            <PowerIcon className="w-5 text-color-shop" />
                        </button>
                    </form>
                </div>

                <div className={`absolute top-8 right-0 z-30 w-[150px] flex flex-col bg-color-shop-400  ${transClass}`}>
                    {
                        menuItems?.map(item =>
                            <Link
                                key={item.route}
                                className="hover:bg-color-shop-400 text-color-shop text-sm px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >{item.title}</Link>
                        )
                    }
                </div>
            </div>
            {
                isOpen
                    ?
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
                        onClick={toggle}
                    ></div>
                    :
                    <></>
            }
        </>
    )
}