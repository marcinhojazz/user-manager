<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="bg-gray-800 text-white px-4 py-4 rounded shadow transition-all duration-300 flex items-center gap-2"
      :class="{
        'bg-green-500': toast.type === 'success',
        'bg-red-600': toast.type === 'error',
        'bg-yellow-600': toast.type === 'warning'
      }"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 1.67c.955 0 1.845.467 2.39 1.247l.105.16l8.114 13.548a2.914 2.914 0 0 1-2.307 4.363l-.195.008H3.882a2.914 2.914 0 0 1-2.582-4.2l.099-.185l8.11-13.538A2.91 2.91 0 0 1 12 1.67M12 11h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876zm.01-3l-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986z"/></svg>
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/store/toast'

const toastStore = useToastStore()
const toasts = toastStore.toasts
</script>
