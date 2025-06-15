import { useToast } from 'vue-toastification'

const toast = useToast()

export const toastService = {
  success(message: string, options = {}) {
    toast.success(message, options)
  },
  error(message: string, options = {}) {
    toast.error(message, options)
  },
  info(message: string, options = {}) {
    toast.info(message, options)
  },
  warning(message: string, options = {}) {
    toast.warning(message, options)
  },
}
