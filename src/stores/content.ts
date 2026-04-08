import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchResourcesHub, type Locale } from '@/api/strapi'
import type { ResourcesHub } from '@/api/types'

export const useContentStore = defineStore('content', () => {
  const hub = ref<ResourcesHub | null>(null)
  const locale = ref<Locale>('en')

  async function load(newLocale: Locale = 'en') {
    locale.value = newLocale
    const res = await fetchResourcesHub(newLocale)
    hub.value = res.data
  }

  return { hub, locale, load }
})
