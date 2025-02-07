import axios from "axios";
// import { useRouter } from 'vue-router'
import router from '../router'

// const router = useRouter()

const Service = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
    console.log(222, response);
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