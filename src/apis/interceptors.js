import axios from "axios";
// import { useRouter } from 'vue-router'
import router from '../router'

// const router = useRouter()

const API_URL = 'http://6rtdeonrt.laravel-sail.site:8080/api'
    // process.env.NODE_ENV === 'development'
    //     ? 'http://localhost/api'
    //     : 'todo'; //@todo

const Service = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

Service.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = "Bearer " + localStorage.getItem('token');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

Service.interceptors.response.use((response) => {
    console.log(222, response.status);
    // if (response.status === 401) {
    //     router.push({ name: 'login' })
    // }
    // if (response.config.parse) {
    //     //perform the manipulation here and change the response object
    // }
    return response;
}, (error) => {
    const status = error.response?.status || 500;

    if (status === 401) {
        return router.push({name: 'login'})
    }

    return Promise.reject(error.message);
});

export {Service};