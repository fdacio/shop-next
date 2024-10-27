"use client"
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Product } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";

export default function Page() {

    const { data: products, loading, error } = useApiGet<Product[] | undefined>("/product");

    return (
        <div>
            <h1>Products</h1>
            <ul>
            <Loading isLoading={loading} />
            <ApiMessageResponse status={error?.status} message={error?.message} />
                {products?.map((product: Product) => {
                    return (
                        <li key={product.id}>{product.nome}</li>
                    )
                }
                )}
            </ul>
        </div>
    )
}