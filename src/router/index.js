import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Books from '../views/Books.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/books', component: Books, name: 'books', meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.meta.requiresAuth && !token) {
//     next('/login')
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // ยังไม่ล็อกอิน แต่พยายามเข้า page ที่ต้องการ auth
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && token) {
    // ล็อกอินอยู่แล้ว แต่พยายามเข้าหน้า login หรือ register
    next('/books') // หรือ path ที่คุณต้องการให้ redirect
  } else {
    next()
  }
})


export default router
