
import axios from 'axios'

import { env } from './../env'

const api = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/`,
  timeout: 5000,
})


export default api
