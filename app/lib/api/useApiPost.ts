import { ApiError } from "../definitions";
import axiosInstance from "./axiosInstance";

export const useApiPost = async <T = unknown>(url: string, dataRequest: any, options = {}) => {

    var data:T | undefined;
    var error: ApiError | undefined;
    var loading: boolean = false;

    const handlerPost = async (requestData: any) => {
        
        loading = true;

        try {
            const response = await axiosInstance.post(url, requestData, options);
            data = (response.data);

        } catch (err: any) {
            let e : ApiError = {
                status: err.response?.status,
                message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error
            }
            error = e;
        } finally {
            loading = (false);
        }
    }

    await handlerPost(dataRequest);

    return {data, loading, error };
}