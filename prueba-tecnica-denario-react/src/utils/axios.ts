import axios from 'axios'

axios.defaults.baseURL =  'http://localhost:3026/api';

axios.interceptors.request.use(request => {
	const token = localStorage.getItem('token');
	if (token) {
		request.headers.Authorization = `Bearer ${token}`
	}
	return request
})

axios.interceptors.response.use(
	(response) => {
		return { ...response.data, status: response.status };
	},
	(error) => {
		if(error?.response?.status === 401){
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
		throw Error(error);
	},
)