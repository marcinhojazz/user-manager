import { defineStore } from 'pinia'

interface ToastMessage {
  message: string
  type: 'success' | 'error' | 'warning'
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as ToastMessage[]
  }),
  actions: {
    show(message: string, type: 'success' | 'error' | 'warning' = 'success') {
      this.toasts.push({ message, type })

      // Remove após 3s
      setTimeout(() => {
        this.toasts.shift()
      }, 3000)
    }
  }
})
