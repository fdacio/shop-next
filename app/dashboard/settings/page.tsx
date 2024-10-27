"use client"
import { useApiGet } from "@/app/lib/api/requests/csr/useApiGet";
import { Config } from "@/app/lib/api/types/entities";
import ApiMessageResponse from "@/app/ui/api-message-response";
import Loading from "@/app/ui/loading";
import ListConfigs from "@/app/ui/settings/list";
import FormConfig from "@/app/ui/settings/form";

export default function Page() {

    const { data: configs, loading, error: errorGet } = useApiGet<Config[] | undefined>("/auth/config");

    return (
        <div>
            <h1>Settings</h1>
            <Loading isLoading={loading} />
            <ApiMessageResponse status={errorGet?.status} message={errorGet?.message} />
            <ListConfigs data={configs} />
            <div className="p-1"></div>
            {(!errorGet) &&
            <FormConfig />
           }
        </div>
    )
}