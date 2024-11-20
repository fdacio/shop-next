import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function ShopLogo() {
  return (
    <div className={`${roboto.className} flex flex-row items-center leading-none`} >
      <ShoppingCartIcon className="h-10 w-10 text-yellow-500" />
      <p className="text-[36px] text-yellow-500">Shop</p>
    </div>
  );
}
