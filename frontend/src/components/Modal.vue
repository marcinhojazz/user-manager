<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 mx-4 relative"
      ref="modalRef"
    >
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-black"
        @click="$emit('close')"
        aria-label="Fechar"
      >
        ✕
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['close'])
const modalRef = ref<HTMLElement | null>(null)

function escListener(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', escListener)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', escListener)
})
</script>
