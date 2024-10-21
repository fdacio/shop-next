"use client"
import styles from "@/app/ui/products/products.module.css";
import ProductsCardHome from "./products-card-home";
import { useApi, ApiMethod } from '@/app/lib/useApi';
import { Product, Token } from "@/app/lib/definitions";

export default function ProductsHome() {

    const { data : products, loading, error } = useApi<Product[]>(ApiMethod.GET, "/product/all/home");

    return (
        <div className={styles.container}>
            {(loading) && <p>Carregando ...</p>}
            {(error) && <p>{error.message}</p>}
            {products?.map(product => {
                return (
                    <ProductsCardHome product={product} key={product.id.toString()} />
                )
            }
            )}
        </div>
    )
}