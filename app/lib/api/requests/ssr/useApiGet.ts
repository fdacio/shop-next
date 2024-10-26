import axiosInstance from "../axiosInstance";
import { ApiErrorType } from "../../types/types";

export const useApiGet = async <T = unknown>(url: string, options = {}) => {

    let data: T = <T>{};
    let loading: boolean = true;
    let error: ApiErrorType | any;
    
    const handlerGet = async () => {

        try {

            const response = await axiosInstance.get(url, options);
            if (response.data.hasOwnProperty('content')) {
                data = (response.data.content);
            }
            else {
                data = (response.data);
            }        
        }       
        catch (err: any) {
            let e  = {
                status: err.response?.status,
                message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error
            }
            error = {
                status : e.status,
                message : e.message
            }
        } finally {
            loading = false;
        }
    
    }
    
    await handlerGet();

    return { data, loading, error }

}