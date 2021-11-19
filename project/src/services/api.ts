import axios from 'axios';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export enum HttpCode {
  Unauthorized = 401,
  ServerErrorMin = 500,
  ServerErrorMax = 599,
}

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
});

export default api;
