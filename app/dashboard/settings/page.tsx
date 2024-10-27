"use client"
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Config, Product } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";

export default function Page() {

    const { data: configs, loading, error } = useApiGet<Config[] | undefined>("/product");

    return (
        <div>
            <h1>Settings</h1>
            <ul>
            <Loading isLoading={loading} />
            <ApiMessageResponse status={error?.status} message={error?.message} />
                {configs?.map((config: Config) => {
                    return (
                        <li key={config.id}>{config.chave} | {config.valor} </li>
                    )
                }
                )}
            </ul>
            
        </div>
    )
}