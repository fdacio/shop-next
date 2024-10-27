'use client'
import axiosInstance from "../axiosInstance";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";

export const useApiPatch = <T = unknown>(url: string, dataRequest: any, options = {}) : ApiResponseType => {

    let data: T | undefined;
    let loading: boolean = false;
    let error: ApiResponseError | undefined;
    let success: ApiResponseSuccess | undefined;

    const handlerPatch = async (requestData: any) => {

        loading = true;

        try {
            const response = await axiosInstance.patch(url, requestData, options);
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

    handlerPatch(dataRequest);

    return { data, loading, success, error };
}