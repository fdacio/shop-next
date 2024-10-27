import { Order } from "@/app/lib/api/types/entities"

export default function List({ data : orders }: { data: Order[] | undefined }) {
    
    return (
        <ul>
            {orders?.map((order: Order) => {
                return (
                    <li key={order.id}>{order.id} | {order.data} | {order.customer.nome} </li>
                )
            }
            )}
        </ul>

    )
}