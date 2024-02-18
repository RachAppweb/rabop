import axios from 'axios'

const BASE_URL='https://rabop-backend.onrender.com/api/'

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