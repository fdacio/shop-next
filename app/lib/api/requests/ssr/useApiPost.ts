'use server'
import axiosInstance from "../axiosInstance";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";

export const useApiPost = async <T = unknown>(url: string, dataRequest: any, options = {}) : Promise<ApiResponseType> => {

    let data: T | undefined;
    let loading: boolean = false;
    let success: ApiResponseSuccess | undefined;
    let error: ApiResponseError | undefined;

    const handlerPost = async (requestData: any) => {

        loading = true;

        try {
            const response = await axiosInstance.post(url, requestData, options);
            data = response.data;
            success = {status : response.status, message : "Requisição realizada com sucesso" }

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

    await handlerPost(dataRequest);

    return { data, loading, success, error };
}