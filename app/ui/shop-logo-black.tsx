import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function ShopLogoBlack() {
  return (
    <div className={`${roboto.className} flex flex-row items-start leading-none`}>
      <ShoppingCartIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Shop</p>
    </div>
  );
}
