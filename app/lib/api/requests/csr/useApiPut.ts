'use client'
import axiosInstance from "../axiosInstance";
import { ApiErrorType } from "../../types/entities";

export const useApiPut = async <T = unknown>(url: string, dataRequest: any, options = {}) => {

    let data: T | undefined;
    let loading: boolean = false;
    let error: ApiErrorType | any;

    const handlerPuth = async (requestData: any) => {

        loading = true;

        try {
            const response = await axiosInstance.put(url, requestData, options);
            data = (response.data);

        } catch (err: any) {
            let e = {
                status: err.response?.status,
                message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error
            }
            error = {
                status : e.status,
                message : e.message
            }
        } finally {
            loading = (false);
        }
    }

    await handlerPuth(dataRequest);

    return { data, loading, error };
}