import axios from 'axios'

import { BACKEND_URL } from '@/config.global'
import { getAccessToken } from '@/utils/session'

const axiosInstance = axios.create({ baseURL: BACKEND_URL })

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
