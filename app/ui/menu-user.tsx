import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ApiUser } from '../lib/api/types/entities';
import { PowerIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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

    const menuItems = [
        {
            key: 2,
            title: "Meus Dados",
            route: "/profile/customers/edit"
        },
        {
            key: 3,
            title: "Alterar Senha",
            route: "/profile/customers/password"
        }
    ];

    if (isAdmin) {
        menuItems[menuItems.length] = {
            key: 1,
            title: "Administrativo",
            route: "/administrative"
        }
    }

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen ? "flex" : "hidden";

    return (
        <>
            <div className="relative md:self-end">
                <div className="flex flex-row gap-2">

                    <div className="relative">
                        <button className="text-white md:text-base hover:bg-black-400 flex gap-2 p-1 items-center" onClick={toggle}>
                            <p>{user.nomeSobrenome}</p>
                            <ChevronDownIcon className='w-4' />
                        </button>
                        <div className={`absolute top-8 right-0 z-30 w-[150px] flex flex-col bg-black-500 ${transClass}`}>
                            {
                                menuItems?.map(item =>
                                    <Link
                                        key={item.key}
                                        className={`hover:bg-black-400 text-yellow-400 text-sm px-4 py-1 ${(item.key == 1) ? 'border-t border-gray-500' : ''}`}
                                        href={item?.route || ''}
                                        onClick={toggle}
                                    >
                                        {item.title}
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handlerSignOut)}>
                        <button className="flex gap-2 hover:bg-black-400 text-yellow-500 p-1 items-center">
                            <p className="text-link">Sair</p>
                            <PowerIcon className="w-4" />
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