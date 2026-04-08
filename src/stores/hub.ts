import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHubStore = defineStore('hub', () => {
  const selectedAudience = ref<string | null>(null)
  const selectedCategory = ref<string | null>(null)

  function reset() {
    selectedAudience.value = null
    selectedCategory.value = null
  }

  return { selectedAudience, selectedCategory, reset }
})
