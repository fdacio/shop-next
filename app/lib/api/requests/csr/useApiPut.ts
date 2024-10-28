'use client'
import axiosInstance from "../axiosInstance";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";

export const useApiPut = async <T = unknown>(url: string, dataRequest: any, options = {}) : Promise<ApiResponseType> => {

    let data: T | undefined;
    let loading: boolean = false;
    let error: ApiResponseError | undefined;
    let success: ApiResponseSuccess | undefined;

    const handlerPut = async (requestData: any) => {

        loading = true;

        try {
            const response = await axiosInstance.put(url, requestData, options);
            data = response.data;
            success = {status : response.status, message : "Dado atualizado com sucesso" }

        } catch (err: any) {
            error = {
                status : err.response?.status,
                message :  (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error,
                fields : [],
            }
        } finally {
            loading = (false);
        }
    }

    await handlerPut(dataRequest);

    return { data, loading, success, error };
}