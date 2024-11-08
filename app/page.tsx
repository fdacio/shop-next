'use client'
import ProductsHome from '@/app/ui/products/home/products-home';
import ShopLogoBlack from '@/app/ui/shop-logo-black';
import ApiMessageErro from './ui/api-messge-error';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { ApiUser } from './lib/api/types/entities';
import { ApiError } from './lib/api/exceptions/ApiError';
import HeaderHome from '@/app/ui/header-home';

export default function Home() {

 return (
    <div className="flex min-h-screen flex-col p-6">
      <HeaderHome />
      <main className="main">

        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-start items-center  gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <ShopLogoBlack />
          </div>
          <ProductsHome />
        </div>
      </main>
    </div>
  );
}

