import { Customer } from "@/app/lib/api/types/entities"

export default function List({ data: customers }: { data: Customer[] | undefined }) {

    return (
        <table className="border w-full">
            <thead>
                <tr className="bg-gray-300">
                    <th className="text-left border p-1">ID</th>
                    <th className="text-left border p-1">Name</th>
                    <th className="text-left border p-1">Email</th>
                    <th className="text-left border p-1">Phone</th>
                </tr>
            </thead>
            <tbody>
                {customers?.map((customer: Customer) => {
                    return (
                        <tr key={customer.id}>
                            <td className="text-right border p-1">{customer.id}</td>
                            <td className="text-left border p-1">{customer.nome}</td>
                            <td className="text-left border p-1">{customer.email}</td>
                            <td className="text-left border p-1">{customer.telefone}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>

    )
}