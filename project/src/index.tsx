import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AuthStatus, HttpCode } from './constants';
import api from './services/api';
import store from './store/store';
import { setAuthStatus, setServerNotWorking } from './store/app-slice/app-slice';
import App from './components/app/app';

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response?.status === HttpCode.Unauthorized) {
      store.dispatch(setAuthStatus(AuthStatus.NoAuth));
    }

    if (
      response?.status
      && response?.status >= HttpCode.ServerErrorMin
      && response?.status <= HttpCode.ServerErrorMax
    ) {
      store.dispatch(setServerNotWorking());
    }

    return Promise.reject(error);
  },
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
