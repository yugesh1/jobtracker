import axios, { type AxiosInstance } from 'axios'
import { getUserFromLocalStorage } from './localStorage'

const customFetch: AxiosInstance = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage()
  if (user != null) {
    const { token } = user
    if (token !== undefined) config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default customFetch
