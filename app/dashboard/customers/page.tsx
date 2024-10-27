'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Customer } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import ListCutomers from "@/app/ui/customers/list"

export default function Page() {

    const { data: customers, loading, success, error } = useApiGet<Customer[] | undefined>("/customer");

    return (
        <div>
            <h1 className="mb-4 text-2xl">Customers</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse response={(error) ?? error} />
            <ListCutomers data={customers} />
        </div>
    )
}