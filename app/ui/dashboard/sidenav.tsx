'use client'
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import ShopLogo from '@/app/ui/shop-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@/app/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiUser } from '@/app/lib/api/types/entities';

export default function SideNav() {

  const { signOut, authenticatedUser } = useContext(AuthContext);
  const { handleSubmit } = useForm();
  const [authUser, setAuthUser] = useState<ApiUser | undefined>(undefined);

  const handlerSignOut = async () => {
    await signOut();
  }

  useEffect(() => {

    const handleAuthenticatedUser = async () => {

      const user = await authenticatedUser();
      if (user) setAuthUser(user);

    }
    handleAuthenticatedUser();

  }, [])


  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-color-shop p-4 md:h-40"
        href="/"
      >
        <div className="flex justify-between w-32 text-white md:w-40">
          <ShopLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
        {
          (authUser) &&
            <div className="md:self-end">
              <p>{authUser?.nome}</p>
              <p>{authUser?.username}</p>
            </div>}
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
