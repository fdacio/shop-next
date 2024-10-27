"use client"
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Product } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import ListProducts from "@/app/ui/products/list";

export default function Page() {

    const { data: products, loading, error } = useApiGet<Product[] | undefined>("/product");

    return (
        <div>
            <h1 className="text-bold">Products</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse status={error?.status} message={error?.message} />
            <ListProducts data={products} />
        </div>
    )
}