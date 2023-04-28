import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { httpClient } from '../api/base-api'

export const useAuthStore = defineStore('auth', () => {
  const apiKey = useLocalStorage<string|null>('api-key', null)
  const isAuthorized = computed(() => apiKey.value !== null)

  if (apiKey.value !== null) {
    httpClient.setApiKey(apiKey.value)
  }

  return {apiKey, isAuthorized}
})
