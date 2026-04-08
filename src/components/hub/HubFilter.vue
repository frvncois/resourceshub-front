<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchAudiences, fetchCategories } from '@/api/strapi'
import type { Audience, Category } from '@/api/types'
import { useHubStore } from '@/stores/hub'

const store = useHubStore()
const audiences = ref<Audience[]>([])
const categories = ref<Category[]>([])

onMounted(async () => {
  const [aud, cat] = await Promise.all([fetchAudiences(), fetchCategories('en')])
  audiences.value = aud.data
  categories.value = cat.data
})
</script>

<template>
  <section>
    <div class="bg-yellow-300 flex items-center justify-center gap-4 p-8 mb-24 w-6xl m-auto">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium whitespace-nowrap">I am</label>
        <select
          v-model="store.selectedAudience"
          class="h-10 rounded-md border border-black/20 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
        >
          <option :value="null">— all —</option>
          <option v-for="a in audiences" :key="a.id" :value="a.name">{{ a.name }}</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium whitespace-nowrap">looking for</label>
        <select
          v-model="store.selectedCategory"
          class="h-10 w-64 rounded-md border border-black/20 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
        >
          <option :value="null">— all —</option>
          <option v-for="c in categories" :key="c.id" :value="c.slug">{{ c.name }}</option>
        </select>
      </div>
      <button
        @click="store.reset()"
        class="h-10 rounded-md border border-black/20 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-black hover:text-white cursor-pointer"
      >
        Reset
      </button>
    </div>
  </section>
</template>
