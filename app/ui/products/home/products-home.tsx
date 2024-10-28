"use client"
import { useApiGet } from '@/app/lib/api/requests/csr/useApiGet';
import { Product } from "@/app/lib/api/types/entities";
import styles from "@/app/ui/products/home/products.module.css";
import ProductsCardHome from "./products-card-home";
export default function ProductsHome() {

    const { data : products, loading, error } = useApiGet<Product[] | undefined>("/product/all/home");

    return (
        <div className={styles.container}>
            {(loading) && <p>Carregando ...</p>}
            {(error) && <p>{error.message}</p>}
            {products?.map((product : Product) => {
                return (
                    <ProductsCardHome product={product} key={product.id.toString()} />
                )
            }
            )}
        </div>
    )
}