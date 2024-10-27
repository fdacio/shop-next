'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Customer } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import ListCutomers from "@/app/ui/customers/list"

export default function Page() {

    const { data: customers, loading, error } = useApiGet<Customer[] | undefined>("/customer");

    return (
        <div>
            <h1>Customers</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse status={error?.status} message={error?.message} />
            <ListCutomers data={customers} />
        </div>
    )
}