'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Order } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";

export default function Page() {

    const { data: orders, loading, error } = useApiGet<Order[] | undefined>("/order");

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                <Loading isLoading={loading} />
                <ApiMessageResponse status={error?.status} message={error?.message} />
                {orders?.map((order: Order) => {
                    return (
                        <li key={order.id}>{order.customer.nome} | {order.data}</li>
                    )
                }
                )}
            </ul>
        </div>
    )
}