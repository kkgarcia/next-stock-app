import axios, { type InternalAxiosRequestConfig } from 'axios'

export const polygonAPI = axios.create({
  method: 'get',
  baseURL: 'https://api.polygon.io',
})

polygonAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  return config
})
