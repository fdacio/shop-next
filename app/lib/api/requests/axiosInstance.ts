import axios, { AxiosError } from 'axios';
import { Token } from '../types/entities';
import { useApiPostSSR } from './ssr/useApiPost';
import { getCookie, createCookie, clearCookie } from '../../cookies';

let isRefreshToken = false;

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 10000, //10secunds
	withCredentials: true,
})

axiosInstance.interceptors.request.use(async (config) => {

	if (config.withCredentials) {
		//const { 'shop.token': accessToken } = parseCookies(undefined);
		let cookieToken = await getCookie("shop.token");
		let accessToken = cookieToken?.value;
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

				console.log("Token expirado");

				try {

					let cookieToken = await getCookie("shop.token");
					let invalidToken = cookieToken?.value;
					await clearCookie("shop.token");
			
					const dataToken = {
						token: invalidToken,
						expired: undefined
					}
					
					//Obtem o novo token - request side sever
					const response = await useApiPostSSR<Token>('/auth/refresh-token', dataToken, { withCredentials: false });

					let newToken = response.data.token;

					axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

					await createCookie("shop.token", newToken);

					console.log("Token renovado!!!");

					return axiosInstance(originalRequest);


				} catch (refreshError: AxiosError | any) {
					console.log(refreshError);
					return Promise.reject(refreshError);
				}

			}

			return axiosInstance(originalRequest);


		}

		return Promise.reject(error);

	}
);

export default axiosInstance;

