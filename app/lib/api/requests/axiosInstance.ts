import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useApiPostSSR } from "./ssr/useApiPost";
import { Token } from '../types/entities';
import { ApiAuthError } from '../exceptions/ApiAuthError';
import { ApiError } from '../exceptions/ApiError';
import { createCookie, clearCookie, getCookie } from '@/app/lib/cookies';
import { useApiPost } from './csr/useApiPost';
import { redirectLogin, redirectSignOut } from './auth-redirects';

let isRefreshToken = false;

let failedRequestQueue: {
	// Se a requisição der sucesso, chama o onSuccess
	onSuccess: (token: string) => void;
	// Se a requisição der erro, chama o onFailure
	onFailure: (err: AxiosError) => void;
}[] = [];

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 10000, //10secunds
	withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {

	if (config.withCredentials) {
		const { 'shop.token': accessToken } = parseCookies(undefined);
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
	} else {
		config.headers['Authorization'] = null;
	}

	config.headers['Accept-Language'] = 'pt-Br';
	config.headers['Content-Type'] = 'application/json';

	return config;
},
	(error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use((response) => {

	return response;

},

	async (error) => {

		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {

			originalRequest._retry = true;

			let responseErrorMessage = JSON.stringify(error.response.data.message, null, '\t');

			let isRefreshToken = (responseErrorMessage != undefined) ? responseErrorMessage.includes('Token expirado') : false;

			if (isRefreshToken) {

				isRefreshToken = false;

				console.log("Token expirado");

				try {

					let cookieToken = await getCookie("shop.token");

					const dataToken = {
						token: cookieToken?.value,
						expired: undefined
					}

					//Obtem o novo token - request side sever
					const response = await useApiPostSSR<Token>('/auth/refresh-token', dataToken, { withCredentials: false });

					let newToken = response.data.token;

					
					await clearCookie("shop.token");
					await createCookie("shop.token", newToken);
					
					axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
					
					console.log("Token renovado!!!");


				} catch (refreshError) {
					await clearCookie("shop.token");
					redirectSignOut();
					return Promise.reject(refreshError);
				}

				return axiosInstance(originalRequest);

			}

		}

		return Promise.reject(error);

	}
);

export default axiosInstance;