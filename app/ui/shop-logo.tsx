import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function ShopLogo() {
  return (
    <div
      className={`${roboto.className} flex flex-row items-center leading-none text-color-yellow`}
    >
      <ShoppingCartIcon className="h-10 w-10 text-color-shop" />
      <p className="text-[36px] text-color-shop">Shop</p>
    </div>
  );
}
