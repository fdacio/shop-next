"use client"
import { useState, useEffect, useCallback, unstable_SuspenseList } from 'react';
import styles from "@/app/ui/products/products.module.css";
import ProductsCardHome from "./products-card-home";
import { useApiGet } from '@/app/lib/api/useApiGet';
import { Product, Token } from "@/app/lib/definitions";
import { ApiError } from '@/app/lib/definitions';
export default function ProductsHome() {

    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | undefined>(undefined);

    useEffect(() => {

        const fetchData = async () => {
            const { data, loading, error } = await useApiGet<Product[] | undefined>("/product/all/home");
            setProducts(data);
            setLoading(loading);
            setError(error);
        };

        fetchData();

    }, []);


    return (
        <div className={styles.container}>
            {(loading) && <p>Carregando ...</p>}
            {(error) && <p>{error.message}</p>}
            {products?.length != undefined && products?.map(product => {
                return (
                    <ProductsCardHome product={product} key={product.id.toString()} />
                )
            }
            )}
        </div>
    )
}