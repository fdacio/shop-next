'use client'
import axiosInstance from "../axiosInstance";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
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
            catch (err: AxiosError | any) {
                let message = (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error; 
                let status = err.response?.status; 
                let error : ApiResponseError = {
                    status: status,
                    message: message,
                    fields: []
                }
                setError(error);

            } finally {
                setLoading(false);
            }

        }

        handlerGet();

    }, [url])

    return { data, loading, success, error }

}