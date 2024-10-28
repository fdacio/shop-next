import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { useApiPost } from "./ssr/useApiPost";
import { cookiesServer } from './cookies';
import { Token } from '../types/entities';
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 10000, //10secunds
})


axiosInstance.interceptors.request.use((config) => {
	const { 'shop.token': accessToken } = parseCookies(undefined);
	if (accessToken) {
		config.headers['Authorization'] = `Bearer ${accessToken}`;
	}
	config.headers['Accept-Language'] = 'pt-Br';
	config.headers['Content-Type'] = 'application/json';

	return config;
},
	(error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use((response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {

			originalRequest._retry = true;

			const cookieStore = await cookiesServer();
			const expiredToken = cookieStore.get('shop.token')
			const dataToken = {
				token: expiredToken?.value,
				number: undefined
			}

			const { data: tokenRefreshed } = await useApiPost<Token>('/auth/refresh-token', dataToken);

			cookieStore.set("shop.token", tokenRefreshed.token);
			
			axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokenRefreshed.token}`;					

			return axiosInstance(originalRequest);


		}

		return Promise.reject(error);
	}
);

export default axiosInstance;