import HeaderHome from "../ui/header-home";
import ProductsHome from "../ui/products/home/products-home";
import ShopLogoBlack from "../ui/shop-logo-black";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col p-6">
			<HeaderHome />
			<main className="main">
				<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
					<div className="flex flex-col justify-start items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20 h-full">
						<ShopLogoBlack />
					</div>
					<div className="md:w-full">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}