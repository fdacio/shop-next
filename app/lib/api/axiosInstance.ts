import axios from 'axios';

// Axios Interceptor Instance
const axiosInstance = axios.create({
	baseURL: process.env.BASE_URL,
	//baseURL: 'http://138.197.210.74:8880',
	timeout: 10000, //10secunds
})

axiosInstance.interceptors.request.use((config) => {
	let accessToken = undefined; //Aqui pegar possivelmente por cookies 
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
			//const refreshToken = localStorage.setItem('token', "");
			//const refreshToken = localStorage.getItem('refreshToken');
			try {
				// const { data } = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
				// localStorage.setItem('accessToken', data.accessToken);
				// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// Handle token refresh error (e.g., redirect to login)
			}
		}
		return Promise.reject(error);
	}
);
export default axiosInstance;