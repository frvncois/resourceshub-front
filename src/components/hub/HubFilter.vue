<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { fetchAudiences } from '@/api/strapi'
import type { Audience } from '@/api/types'
import { useHubStore } from '@/stores/hub'
import { storeToRefs } from 'pinia'
import { useT } from '@/locales'

const store = useHubStore()
const { availableCategories } = storeToRefs(store)
const audiences = ref<Audience[]>([])
const t = useT()

onMounted(async () => {
  const aud = await fetchAudiences()
  audiences.value = aud.data
})

watch(() => store.selectedAudience, () => {
  store.selectedCategory = null
})
</script>

<template>
  <section>
    <div class="bg-yellow-300 flex flex-col md:flex-row items-center justify-center gap-4 p-6 md:p-8 mb-24 w-full max-w-6xl m-auto -mt-14 rounded-md">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium whitespace-nowrap">{{ t.filter.iAm }}</label>
        <select
          v-model="store.selectedAudience"
          class="h-10 rounded-md border border-black/20 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
        >
          <option :value="null">{{ t.filter.all }}</option>
          <option v-for="a in audiences" :key="a.id" :value="a.name">{{ a.name }}</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium whitespace-nowrap">{{ t.filter.lookingFor }}</label>
        <select
          v-model="store.selectedCategory"
          class="h-10 w-64 rounded-md border border-black/20 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
        >
          <option :value="null">{{ t.filter.all }}</option>
          <option v-for="c in availableCategories" :key="c.id" :value="c.slug">{{ c.name }}</option>
        </select>
      </div>
      <button
        @click="store.reset()"
        class="h-10 rounded-md border border-black/20 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-black hover:text-white cursor-pointer"
      >
        {{ t.filter.reset }}
      </button>
    </div>
  </section>
</template>
