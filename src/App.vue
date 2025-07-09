<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/login')
}

const username = localStorage.getItem('username') || ''
const showLogout = computed(() => route.name == 'books')
</script>

<template>
  <header
    v-if="showLogout"
    class="flex justify-between items-center px-6 py-4 bg-stone-50 shadow-lg border-b border-gray-300 rounded-b-md sticky top-0 z-50"
  >
    <h1 class="text-2xl font-extrabold text-gray-900 tracking-wide select-none">
      Books
    </h1>

    <div class="flex items-center space-x-6">
      <span class="text-gray-700 font-medium text-sm select-text">
        Welcome, <span class="font-semibold">{{ username }}</span>
      </span>
      <button
        @click="logout"
        class="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition duration-300"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
          />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </header>

  <router-view />
</template>


