import { useApiPatch } from "@/app/lib/api/requests/csr/useApiPatch";
import { useForm } from "react-hook-form";
import { Config } from "tailwindcss";
import { Button } from "../button";
import { roboto } from "../fonts";
import { ApiResponse } from "@/app/lib/api/types/entities";
import { useEffect, useState } from "react";
import ApiMessageResponse from "../api-message-response";

export default function Form({ data: config }: { data: Config | undefined }) {

    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [responseApi, setResponseApi] = useState<ApiResponse | undefined>(undefined);

    useEffect(() => {
        setValue("valor", config?.valor);
    }, [config]);

    const handleUpdateSetting = async (data: any) => {
        setIsLoading(true);
        setResponseApi(undefined);
        await useApiPatch<Config>("/auth/config/expire-token", data)
            .then(response => {
                setResponseApi({ status: response.success?.status, message: response.success?.message });
                setValue("valor", response.data.valor);
            }).catch(err => {
                setResponseApi({ status: err.error?.status, message: err.error?.message });
            }).finally(() => {
                setIsLoading(false)
            });

    }
    return (

        <form onSubmit={handleSubmit(handleUpdateSetting)} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${roboto.className} mb-3 text-1xl`}>
                    Expire Token Update
                </h1>
                <ApiMessageResponse response={responseApi} />
                <div className="itens-center">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="valor"
                        >
                            Expire Token in seconds
                        </label>
                        <div className="flex gap-2">
                            <input
                                {...register('valor')}
                                className="peer block w-80 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                                id="valor"
                                type="number"
                                name="valor"
                                placeholder="Informe o tempo em segundos"
                                required
                            />
                            <Button className="bg-color-shop text-color-shop w-18" disabled={isLoading}>
                                {
                                    (!isLoading)
                                        ?
                                        <>
                                            Save
                                        </>
                                        :
                                        <>
                                            Aguarde ...
                                        </>
                                }
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </form>

    )

}