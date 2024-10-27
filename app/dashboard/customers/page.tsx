'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Customer } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";

export default function Page() {

    const { data: customers, loading, error } = useApiGet<Customer[] | undefined>("/customer");

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                <Loading isLoading={loading} />
                <ApiMessageResponse status={error?.status} message={error?.message} />
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