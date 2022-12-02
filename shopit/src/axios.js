import axios from 'axios';
import config from './config';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return data;
    },
);

export default instance;
