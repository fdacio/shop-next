'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Order } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import ListOrders from "@/app/ui/orders/list"

export default function Page() {

    const { data: orders, loading, error } = useApiGet<Order[] | undefined>("/order");

    return (
        <div>
            <h1 className="mb-4 text-2xl">Orders</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse response={(error) ?? error} />
            <ListOrders data={orders} />

        </div>
    )
}