import { useContext, useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { ApiUser } from '../lib/api/types/entities';
import { redirectRoot } from '../lib/api/requests/auth-redirects';

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
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isAdmin = userAdmin(user);

    const menuItems = (isAdmin) ? [
        {
            title: "Dashboard",
            route: "/dashboard"
        }
    ]: [];

    const { handleSubmit } = useForm();


    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen ? "flex" : "hidden";



    return (
        <>
            <div className="relative md:self-end">
                <button className="text-white md:text-base" onClick={toggle}>{user.nomeSobrenome}</button>

                <div className={`absolute top-8 right-0 z-30 w-[150px] flex flex-col bg-color-shop-400  ${transClass}`}>
                    {
                        menuItems?.map(item =>
                            <Link
                                key={item.route}
                                className="hover:bg-color-shop-400 text-color-shop px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >{item.title}</Link>
                        )
                    }
                    <form onSubmit={handleSubmit(handlerSignOut)}>
                        <button className="">
                            <div className="hover:bg-color-shop-400 text-color-shop px-4 py-1">Sair</div>
                        </button>
                    </form>
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