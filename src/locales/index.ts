import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import en from './en'
import fr from './fr'
import es from './es'

const messages = { en, fr, es }

export function useT() {
  const { locale } = storeToRefs(useContentStore())
  return computed(() => messages[locale.value])
}
