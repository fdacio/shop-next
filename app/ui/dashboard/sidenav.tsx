'use client'

import NavLinks from '@/app/ui/dashboard/nav-links';
import ShopLogo from '@/app/ui/shop-logo';
import { parseCookies } from "nookies"
import { PowerIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@/app/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiUser } from '@/app/lib/api/types/entities';
import { useApiPost } from '@/app/lib/api/requests/csr/useApiPost';

export default function SideNav() {

  const { signOut } = useContext(AuthContext);
  const { handleSubmit } = useForm();
  const [authUser, setAuthUser] = useState<ApiUser | undefined>(undefined);

  const { 'shop.token': accessToken } = parseCookies(undefined);
  const { handlePost } = useApiPost<ApiUser>("auth/user/authenticated", {}, { headers: { 'Authorization': 'Bearer ' + accessToken } });

  useEffect(() => {
      const callPost = async () => {
          const { data: user } = await handlePost();
          setAuthUser(user);
      }
      callPost();
  }, []);

  const handlerSignOut = async () => {
    await signOut();
  }


  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 justify-start rounded-md bg-black-500 p-4 md:h-40">
        <div className="flex flex-col justify-between w-full">
          <ShopLogo />
          {
            (authUser) &&
            <div className="text-sm text-yellow-500 self-end">
              <p>{authUser?.nomeSobrenome}</p>
            </div>
          }
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
        </div>
        <form onSubmit={handleSubmit(handlerSignOut)}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
