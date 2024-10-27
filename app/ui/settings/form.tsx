import { useApiPatch } from "@/app/lib/api/requests/csr/useApiPatch";
import { useForm } from "react-hook-form";
import { Config } from "tailwindcss";
import ApiMessageResponse from "../api-message-response";
import { Button } from "../button";
import { roboto } from "../fonts";
import { ApiErrorType } from "@/app/lib/api/types/entities";
import { useState } from "react";

export default function Form() {

    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [errorApi, setErrorApi] = useState<ApiErrorType | undefined>();

    const handleUpdateSetting = async (data: any) => {
        setIsLoading(true);
        useApiPatch<Config>("/auth/config/update-expire-token-", data)
            .then((response) => { })
            .catch(err => { setErrorApi(err) })
            .finally(() => setIsLoading(false));
    }
    return (
        <form onSubmit={handleSubmit(handleUpdateSetting)} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${roboto.className} mb-3 text-2xl`}>
                Expire Token Update
            </h1>
            <ApiMessageResponse status={errorApi?.status} message={errorApi?.message} />
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="valor"
                    >
                        Expire Token
                    </label>
                    <div className="relative">
                        <input
                            {...register('valor')}
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="valor"
                            type="number"
                            name="valor"
                            placeholder="Informe o tempo em segundos"
                            required
                        />

                    </div>
                </div>
            </div>
        </div>
        <Button className="mt-4 w-full bg-color-shop text-color-shop" disabled={isLoading}>
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


    </form>

    )
}