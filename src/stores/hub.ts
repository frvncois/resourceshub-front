import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Resource } from '@/api/types'

export const useHubStore = defineStore('hub', () => {
  const selectedAudience = ref<string | null>(null)
  const selectedCategory = ref<string | null>(null)
  const resources = ref<Resource[]>([])

  const availableCategories = computed(() => {
    const pool = selectedAudience.value
      ? resources.value.filter((r) => r.audiences.some((a) => a.name === selectedAudience.value))
      : resources.value

    const seen = new Set<string>()
    const cats = []
    for (const r of pool) {
      for (const c of r.categories) {
        if (!seen.has(c.slug)) {
          seen.add(c.slug)
          cats.push(c)
        }
      }
    }
    return cats
  })

  function setResources(data: Resource[]) {
    resources.value = data
  }

  function reset() {
    selectedAudience.value = null
    selectedCategory.value = null
  }

  return { selectedAudience, selectedCategory, resources, availableCategories, setResources, reset }
})
