"use client"
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Config } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import FormConfig from "@/app/ui/settings/form";

export default function Page() {

    const { data: configExpireToken, loading, success, error } = useApiGet<Config | undefined>("/auth/config/expire-token");

    return (
        <div>
            <h1 className="mb-4 text-2xl">Settings</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse response={(error) ?? error} />
            <div className="p-1"></div>
            {(success?.status === 200) &&
            <FormConfig data={configExpireToken}/>
           }
        </div>
    )
}