"use client"
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from './api';
import { Error } from './definitions';
import ErrorNext from 'next/error';

export enum ApiMethod {
    "GET", "POST", "DELETE", "PATCH", "PUT"
}

export const useApi = <T = unknown>(method: ApiMethod, url: string, options = {}) => {


    if (method == ApiMethod.GET) {

        const [data, setData] = useState<T | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {

            const fetchData = async () => {
                try {
                    const response = await axiosInstance.get(url, options);
                    if (response.data.hasOwnProperty('content') != undefined) {
                        setData(response.data.content);
                    }
                    else {
                        setData(response.data);
                    }

                } catch (err: any) {
                    setError(err.response.data);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();

        }, []);

        return { data, loading, error };
    }

    if (method == ApiMethod.POST) {

        const [data, setData] = useState<T | null>(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);


        const callback = useCallback(async (requestData: any) => {

            setLoading(true);

            try {
                const response = await axiosInstance.post(url, requestData, options)
                setData(response.data);

            } catch (err: any) {
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        }, [url])

        return { callback, data, loading, error };
    }

    return {};


};
