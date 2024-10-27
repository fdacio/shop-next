'use client'
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { ApiUser, Product } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import ListUsers from "@/app/ui/users/list";

export default function Page() {

    const { data: users, loading, error } = useApiGet<ApiUser[] | undefined>("/auth/user");

    return (
        <div>
            <h1>Users</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse status={error?.status} message={error?.message} />
            <ListUsers data={users} />
        </div>
    )
}
