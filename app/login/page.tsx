import ShopLogo from '@/app/ui/shop-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-color-shop p-3 md:h-20">
          <div className="w-32 md:w-32">
            <ShopLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}