import axios from 'axios'
import router from '../router' // import ตัว router ของคุณ

const api = axios.create({
  baseURL: 'http://localhost:8000',
  // ตั้งค่าอื่นๆ เช่น headers
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // ลบ token หรือ session ออกจาก storage
      localStorage.removeItem('authToken')
      // พาไปหน้า login
      router.push('/login')
      // หรือแสดง alert: alert('Unauthorized, please login again.')
    }
    return Promise.reject(error)
  }
)

export default api
