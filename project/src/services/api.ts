import axios, { AxiosRequestConfig } from 'axios';
import { tokenKeeper } from '../store/store';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const TIMEOUT = 5000;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
});

api.interceptors.request.use(
  (request): AxiosRequestConfig => {
    const token = tokenKeeper.getToken();

    if (token) {
      request.headers['x-token'] = token;
    }

    return request;
  },
);

export default api;
