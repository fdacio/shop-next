import axios, { AxiosError } from 'axios';
import { Token } from '../types/entities';
import { redirectSignOut } from './auth-redirects';
import { useApiPostSSR } from './ssr/useApiPost';
import { parseCookies, destroyCookie, setCookie } from 'nookies';

let isRefreshToken = false;

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

			let responseErrorMessage = error.response.data.message;

			isRefreshToken = (responseErrorMessage != undefined) ? responseErrorMessage.includes('Token expirado') : false;

			if (isRefreshToken) {

				isRefreshToken = false;

				console.log("Token expirado");

				try {

					//let cookieToken = await getCookie("shop.token");
					const { 'shop.token': accessToken } = parseCookies(undefined);

					const dataToken = {
						token: accessToken,
						expired: undefined
					}

					//Obtem o novo token - request side sever
					const response = await useApiPostSSR<Token>('/auth/refresh-token', dataToken, { withCredentials: false });

					let newToken = response.data.token;

					setCookie(undefined, "shop.token", newToken);

					axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

					console.log("Token renovado!!!");


				} catch (refreshError) {
					destroyCookie(undefined, "shop.token");
					await redirectSignOut();
					return Promise.reject(refreshError);
				}

				return axiosInstance(originalRequest);

			}

		}

		return Promise.reject(error);

	}
);

export default axiosInstance;

