'use client'
import ProductsHome from '@/app/ui/products/products-home';
import ShopLogo from '@/app/ui/shop-logo';
import ShopLogoBlack from '@/app/ui/shop-logo-black';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './context/AuthContext';
import { ApiUser } from './lib/definitions';

export default function Home() {

  const { handleSubmit } = useForm();
  const { signOut, authentocatedUser } = useContext(AuthContext);
  const [authenticatedUser, setAuthenticatedUser] = useState<ApiUser | undefined>(undefined);

  const handleSignOut = async () => {
    await signOut();
  }

  useEffect(() => {
    console.log("useEffect in Home");
    const handleAuthenticatedUser = async () => {
      const user  = await authentocatedUser();
      if (user) setAuthenticatedUser(user);
    }
    handleAuthenticatedUser();

  },[])



  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* <div className={styles.shape} /> */}
      <div className="flex h-20 shrink-0 items-center justify-between rounded-md bg-color-shop p-4 md:h-40 ">
        <ShopLogo />

        {
          (authenticatedUser) ?
            <div className="flex items-center gap-5 md:self-end">
              <span className='text-color-shop'>{authenticatedUser?.nome}</span>
              <form onSubmit={handleSubmit(handleSignOut)}>
                <button className='p-2 m-1 rounded-md bg-color-shop text-color-shop '>Sair</button>
              </form>
            </div>
            :
            <Link
              href="/login"
              className="flex items-center gap-5 md:self-end bg-color-shop text-sm font-medium text-color-shop transition-colors text-center md:text-base"
            >
              <span>Entrar</span> <ArrowRightIcon className="w-5 md:w-6 text-color" />
            </Link >

        }
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-start items-center  gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <ShopLogoBlack />
        </div>
        <ProductsHome />
      </div>
    </main>
  );
}
