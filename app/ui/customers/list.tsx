import { Customer } from "@/app/lib/api/types/entities"

export default function List({ data : customers }: { data: Customer[] | undefined }) {
    
    return (
        <ul>
            {customers?.map((customer: Customer) => {
                return (
                    <li key={customer.id}>{customer.id} | {customer.nome} </li>
                )
            }
            )}
        </ul>

    )
}