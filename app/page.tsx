import ShopLogo from '@/app/ui/shop-logo';
import ShopLogoBlack from '@/app/ui/shop-logo-black';
import ProductsHome from '@/app/ui/products/products-home';
import AuthUser from './ui/auth-user';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* <div className={styles.shape} /> */}
      <div className="flex h-10 shrink-0 items-center justify-between rounded-md bg-color-shop p-4 md:h-40 ">
        <ShopLogo />
        <AuthUser />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-start items-center  gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <ShopLogoBlack/>
        </div>
        <ProductsHome />
      </div>
    </main>
  );
}
