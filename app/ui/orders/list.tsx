import { Order } from "@/app/lib/api/types/entities"

export default function List({ data : orders }: { data: Order[] | undefined }) {
    
    return (
        <table className="border w-full">
            <thead>
                <tr className="bg-gray-300">
                    <th className="text-left border p-1">ID</th>
                    <th className="text-left border p-1">Date/Hour</th>
                    <th className="text-left border p-1">Customer</th>
                </tr>
            </thead>
            <tbody>
            {orders?.map((order: Order) => {
                return (
                    <tr key={order.id}>
                        <td className="text-right border p-1">{order.id}</td>  
                        <td className="text-left border p-1">{order.data}</td>
                        <td className="text-left border p-1">{order.customer.nome}</td>
                    </tr>
                )
            }
            )}
            </tbody>
        </table>

    )
}