<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-white via-green-50 to-green-100 px-4">
    <LoadingOverlay :visible="loading" />
    <div class="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl transition-transform transform hover:scale-[1.01]">
      <div class="flex justify-center mb-4">
        <div class="text-4xl text-green-500">📚</div>
      </div>

      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>

        <p class="text-center text-sm text-gray-500">
          Don’t have an account?
          <router-link to="/register" class="text-green-600 hover:underline">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    LoadingOverlay
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const res = await api.post('/api/login', {
          email: this.email,
          password: this.password,
        })
        const token = res.data.token
        localStorage.setItem('token', token)

        const userRes = await api.get('/api/me', {
          headers: { Authorization: `Bearer ${token}` }
        })

        const { name } = userRes.data
        localStorage.setItem('username', name)

        await Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: `Hello, ${name}`,
          timer: 1500,
          showConfirmButton: false,
          position: 'top-end',
        })

        this.$router.push('/books')
      } catch (err) {
        Swal.fire({
          title: 'Login Failed',
          text: 'Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition duration-300 ease-in-out'
          },
          buttonsStyling: false
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
