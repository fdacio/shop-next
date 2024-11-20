'use client'
import { AxiosError } from "axios";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";
import axiosInstance from "../axiosInstance";

export const useApiPost = <T = unknown>(url: string, dataRequest: any, options = {}): ApiResponseType => {

    const handlePost = async (dataRequest: any) => {

        let data : T | undefined = undefined;
        let loading = false;
        let error : ApiResponseError | undefined = undefined;
        let success : ApiResponseSuccess | undefined = undefined;

        try {
            const response = await axiosInstance.post(url, dataRequest, options);
            data = response.data;
            success = { status: response.status, message: "Dado criado com sucesso" };
        } catch (err: AxiosError | any) {
            error = { status: err.status, message: err.message, fields: [] };

        } finally {
            loading = false;
        }

        return { data, loading, success, error };

    }

    return { handlePost };

}