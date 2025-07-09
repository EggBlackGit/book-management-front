<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 via-white to-blue-50 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition transform hover:scale-[1.01]">
      <h2 class="text-3xl font-bold text-center text-green-600 mb-6">Create an Account</h2>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="name" type="text" required placeholder="Your name"
            class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" required placeholder="you@example.com"
            class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" required placeholder="••••••••"
            class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input v-model="password_confirmation" type="password" required placeholder="••••••••"
            class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>

        <button type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow">
          Register
        </button>

        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-green-600 hover:underline font-medium">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api/api'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.password_confirmation) {
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ตรงกัน',
            text: 'กรุณากรอกรหัสผ่านให้ตรงกันทั้งสองช่อง',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition duration-300 ease-in-out'
            },
            buttonsStyling: false
          })
          return
        }

        const res = await api.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', this.name)
        this.$router.push('/books').then(() => {
          location.reload()
        })
      } catch (err) {
        alert('Register failed. Please try again.')
      }
    },
  },
}
</script>

