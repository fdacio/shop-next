"use server"
import { any, unknown } from "zod";
import { ApiError } from "../definitions";
import axiosInstance from "./axiosInstance";


export const useApiGet = async <T = unknown>(url: string, options = {}) => {

    var data: T = <T>{};
    var error: ApiError = <ApiError>{};
    var loading: boolean = true;

    const handlerGet = async () => {

        try {
            console.log(url);
            const response = await axiosInstance.get(url, options);
            if (response.data.hasOwnProperty('content') != undefined) {
                data = (response.data.content);
            }
            else {
                data = (response.data);
            }        
        }       
        catch (err: any) {
            let e : ApiError = {
                status: err.response?.status,
                message: (err.response?.data?.message) ? err.response?.data?.message : err.response?.data?.error
            }
            error = e;
        } finally {
            loading = false;
        }
    
    }
    
    await handlerGet();

    return { data, loading, error }

}