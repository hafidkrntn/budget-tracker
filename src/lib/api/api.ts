import axios, { type AxiosInstance } from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import queryString from 'query-string';

export const APIAxiosInstance = axios.create({
	baseURL: PUBLIC_BACKEND_URL,
	timeout: 1000 * 60
});

export const getAccessToken = async () => {
	try {
		const token = localStorage.getItem('access');
		if (!token) {
			throw new Error('failed to get token.');
		}

		return token;
	} catch (error) {
		console.log('error cannot get access token', error);
	}
	return '';
};

export const createAuthorizationHeaders = async (token: string) => {
	return {
		Authorization: `Bearer ${token}`
	};
};

const createApi = (axiosInstance: AxiosInstance) => {
	return {
		get: async (
			url: string,
			params?: Record<string, unknown>,
			string?:
				| 'comma'
				| 'bracket'
				| 'index'
				| 'separator'
				| 'bracket-separator'
				| 'colon-list-separator'
				| 'none'
				| undefined
		) => {
			const token = await getAccessToken();
			const headers = await createAuthorizationHeaders(token);
			const response = await axiosInstance.get(url, {
				headers,
				params,
				paramsSerializer: {
					serialize: (params: Record<string, unknown>) => {
						return queryString.stringify(params, {
							arrayFormat: string ? string : 'comma',
							encode: false
						});
					}
				}
			});
			return {
				result: response.data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			};
		},
	post: async (
		url: string,
		data: unknown,
		config?: Record<string, unknown>
	) => {
			const token = await getAccessToken();
			const authorizationHeaders = await createAuthorizationHeaders(token);
			const headers = {
				...authorizationHeaders,
				...(config?.headers ?? {})
			};
			const newConfig = {
				...config,
				headers
			};
			const response = await axiosInstance.post(url, data, newConfig);
			return {
				result: response.data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			};
		},
		put: async (url: string, data: unknown) => {
			const token = await getAccessToken();
			const headers = await createAuthorizationHeaders(token);

			const response = await axiosInstance.put(url, data, {
				headers
			});
			return {
				result: response.data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			};
		},
		delete: async (url: string, params?: Record<string, unknown>,) => {
			const token = await getAccessToken();
			const headers = await createAuthorizationHeaders(token);

			const response = await axiosInstance.delete(url, {
				headers,
				params
			});
			return {
				result: response.data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			};
		},
		deleteById: async (url: string, id: string | number) => {
			const token = await getAccessToken();
			const headers = await createAuthorizationHeaders(token);

			const response = await axiosInstance.delete(url, {
				headers,
				data: id
			});
			return {
				result: response.data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			};
		}
	};
};

export const api = createApi(APIAxiosInstance);
