'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Customer } from "@/app/lib/api/types/types";

export default function Page() {

    const { data: customers, loading, error } = useApiGet<Customer[] | undefined>("/customer");

    console.log(customers);

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                {(loading) && <p>Carregando ...</p>}
                {(error) && <p>{error.message}</p>}
                {customers?.map((customer: Customer) => {
                    return (
                        <li key={customer.id}>{customer.nome}</li>
                    )
                }
                )}
            </ul>
        </div>
    )
}