import { Order } from "@/app/lib/api/types/entities"
import { formatDateTime, formatMoney } from '@/app/lib/formated';

export default function List({ data : orders }: { data: Order[] | undefined }) {
    
    return (
        <table className="border w-full">
            <thead>
                <tr className="bg-gray-300">
                    <th className="text-left border p-1">ID</th>
                    <th className="text-left border p-1">Date/Hour</th>
                    <th className="text-left border p-1">Customer</th>
                    <th className="text-left border p-1">Total</th>
                </tr>
            </thead>
            <tbody>
            {orders?.map((order: Order) => {
                return (
                    <tr key={order.id}>
                        <td className="text-right border p-1">{order.id}</td>  
                        <td className="text-left border p-1">{formatDateTime(order.data)}</td>
                        <td className="text-left border p-1">{order.customer.nome}</td>
                        <td className="text-right border p-1">{formatMoney(order.total)}</td>
                    </tr>
                )
            }
            )}
            </tbody>
        </table>

    )
}