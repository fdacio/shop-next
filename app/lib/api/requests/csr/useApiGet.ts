'use client';
import axiosInstance from "../axiosInstance";
import { ApiErrorType } from "../../types/entities";
import { useEffect, useState } from "react";

export type ApiResponseType = {
    data: any,
    loading: boolean,
    error: ApiErrorType | undefined,
}

export const useApiGet = <T = unknown>(url: string, options = {}) : ApiResponseType => {


    const [data, setData] = useState<T[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiErrorType | undefined>(undefined);

    useEffect(() => {

        const handlerGet = async () => {

            try {

                const response = await axiosInstance.get(url, options);
                console.log("response");
                console.log(response);
                if (response.data.hasOwnProperty('content')) {
                    setData(response.data.content);
                }
                else {
                    setData(response.data);
                }
            }
            catch (err: any) {
                let e: ApiErrorType = {
                    status: err.response?.status,
                    message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error
                }
                setError(e);

            } finally {
                setLoading(false)
            }

        }

        handlerGet();

    }, [])

    return { data, loading, error }

}