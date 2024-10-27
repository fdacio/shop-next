import axiosInstance from "../axiosInstance";
import { ApiErrorType } from "../../types/entities";
import { ApiAuthError } from "../../exceptions/ApiAuthError";

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
            
            if (err.name === 'AxiosError') {
                 error = {
                    status : err.response?.status,
                    message : err.message
                }
            } else {
                error = {
                    status :  err.response?.status,
                    message : (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error
                }

            }

        } finally {
            loading = (false);
        }
    }

    await handlerPost(dataRequest);

    return { data, loading, error };
}