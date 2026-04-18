import axios from 'axios'

// In dev, use proxy (/api) so cookies work with SameSite=Strict.
// In production, use the full URL from env.
const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Normalize error responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    if (data?.errors) {
      return Promise.reject({ errors: data.errors, message: data.message })
    }
    if (data?.message) {
      return Promise.reject({ message: data.message })
    }
    return Promise.reject({ message: 'Network error. Please try again.' })
  }
)

export default api