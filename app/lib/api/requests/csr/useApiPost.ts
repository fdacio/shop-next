'use client'
import axiosInstance from "../axiosInstance";
import { ApiErrorType } from "../../types/entities";

export const useApiPost = async <T = unknown>(url: string, dataRequest: any, options = {}) => {

    let data: T | undefined;
    let loading: boolean = false;
    let error: ApiErrorType | any;

    const handlerPost = async (requestData: any) => {

        loading = true;

        try {
            const response = await axiosInstance.post(url, requestData, options);
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

    await handlerPost(dataRequest);

    return { data, loading, error };
}