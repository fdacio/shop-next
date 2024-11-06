import { useContext, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
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

export default function MenuUser({ user }: { user: ApiUser }) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isAdmin = userAdmin(user);

    const menuItems = (isAdmin) ? [
        {
            title: "Dashboard",
            route: "/dashboard"
        }
    ]: [];

    const { handleSubmit } = useForm();
    const { signOut } = useContext(AuthContext);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    const handlerSignOut = async () => {
        await signOut();
        await redirectRoot();
        //setAuthUser(undefined);
    }



    return (
        <>
            <div className="relative">
                <button className="text-color-shop" onClick={toggle}>{user.nome}</button>

                <div className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col bg-color-shop  ${transClass}`}>
                    {
                        menuItems?.map(item =>
                            <Link
                                key={item.route}
                                className="hover:bg-black-300 hover:text-color-shop px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >{item.title}</Link>
                        )
                    }
                    <form onSubmit={handleSubmit(handlerSignOut)}>
                        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <div className="hidden md:block">Sair</div>
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