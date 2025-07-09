<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center"
  >
    <svg
      class="animate-spin h-10 w-10 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
})
</script>
