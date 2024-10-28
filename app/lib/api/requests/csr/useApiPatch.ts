'use client'
import axiosInstance from "../axiosInstance";
import { ApiResponseError, ApiResponseSuccess, ApiResponseType } from "../../types/entities";

export const useApiPatch = async <T = unknown>(url: string, dataRequest: any, options = {}): Promise<ApiResponseType> => {

    let data: T | undefined;
    let loading: boolean = false;
    let error: ApiResponseError | undefined;
    let success: ApiResponseSuccess | undefined;

    function setData(_data: any) {
        data = _data;
    }
    function setLoading(_loading: any) {
        loading = _loading;
    }

    function setError(_error: any) {
        error = _error;
    }

    function setSuccess(_success: any) {
        success = _success;
    }

    const handlerPatch = async (requestData: any) => {

        setLoading(true);

        try {
            const response = await axiosInstance.patch(url, requestData, options);
            setData(response.data);
            setSuccess({ status: response.status, message: "Dado atualizado com sucesso" });

        } catch (err: any) {
            setError({
                status: err.response?.status,
                message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error,
                fields: [],
            });
        } finally {
            setLoading(false);
        }
    }

    await handlerPatch(dataRequest);

    return { data, loading, success, error };
}