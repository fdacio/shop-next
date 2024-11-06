'use client'
import axiosInstance from "../axiosInstance";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";
import { useEffect, useState } from "react";
import { ApiAuthError } from "../../exceptions/ApiAuthError";
import { ApiError } from "../../exceptions/ApiError";


export const useApiGet = <T = unknown>(url: string, options = {}): ApiResponseType => {

    const[data, setData] = useState<T[] | undefined>(undefined);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<ApiResponseError | undefined>(undefined);
    const[success, setSuccess] = useState<ApiResponseSuccess | undefined>(undefined);

    useEffect(() => {

        const handlerGet = async () => {


            try {

                const response = await axiosInstance.get(url, options);
                if (response.data.hasOwnProperty('content')) {
                    setData(response.data.content);
                }
                else {
                    setData(response.data);
                }
                setSuccess({ status: response.status, message: "Dados carreados com sucesso" });
            }
            catch (err: any) {
                setError({
                    status: err.response?.status,
                    message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error,
                    fields: []
                });
                //throw new ApiError(err.response?.status, (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error,);

            } finally {
                setLoading(false);
            }

        }

        handlerGet();

    }, [url])

    return { data, loading, success, error }

}