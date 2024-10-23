import Link from "next/link";
import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from '@/auth';

export default async function AuthenticatedUser(session: any, status: any) {

    const session___ = auth;

  /*     const { callback, data: user, loading, error } = useApi<User>(ApiMethod.POST, "auth/user/authenticated");
        const router = useRouter();
        const [authUser, setAuthUser] = useState<User | undefined>(undefined);
    
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
            setAuthUser(undefined);
            //router.push("/");
        } */
   

    return (
        <div className="text-color-shop">

            {(status == "authenticated") ?
                <div className="flex items-center gap-5 m-2">
                    {(session.user)&& session.user.nome}
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <PowerIcon className="w-6" />
                            <div className="hidden md:block">Sair</div>
                        </button>
                    </form>
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