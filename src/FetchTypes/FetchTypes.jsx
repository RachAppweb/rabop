import axios from 'axios'

const BASE_URL='http://127.0.0.1:8000/api/'

export const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        "Content-Type":'application/json'
    }
})
export const axiosInstanceSignup=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        "Content-Type":'multipart/form-data'
    }
})
export const axiosPrivateInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        "Content-Type":'application/json'
    }
})