<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import HubPartner from './HubPartner.vue'
import HubResource from './HubResource.vue'
import { fetchResources, fetchPartners } from '@/api/strapi'
import type { Resource, Partner } from '@/api/types'
import { useHubStore } from '@/stores/hub'
import { useContentStore } from '@/stores/content'
import { useT } from '@/locales'

const PAGE_SIZE = 9

const props = defineProps<{ type: 'resource' | 'partner' }>()

const store = useHubStore()
const { locale } = storeToRefs(useContentStore())
const t = useT()
const resources = ref<Resource[]>([])
const partners = ref<Partner[]>([])
const visibleCount = ref(PAGE_SIZE)
const loading = ref(false)

async function load() {
  loading.value = true
  visibleCount.value = PAGE_SIZE
  if (props.type === 'resource') {
    const res = await fetchResources(locale.value)
    resources.value = res.data
    store.setResources(res.data)
  } else {
    const res = await fetchPartners(locale.value)
    partners.value = res.data
  }
  loading.value = false
}

watch(locale, load, { immediate: true })
watch(() => [store.selectedAudience, store.selectedCategory], () => {
  visibleCount.value = PAGE_SIZE
})

const filteredResources = computed(() => {
  return resources.value.filter((r) => {
    if (store.selectedAudience && !r.audiences.some((a) => a.name === store.selectedAudience))
      return false
    if (store.selectedCategory && !r.categories.some((c) => c.slug === store.selectedCategory))
      return false
    return true
  })
})

const visibleResources = computed(() => filteredResources.value.slice(0, visibleCount.value))
const visiblePartners = computed(() => partners.value.slice(0, visibleCount.value))

const hasMoreResources = computed(() => visibleCount.value < filteredResources.value.length)
const hasMorePartners = computed(() => visibleCount.value < partners.value.length)

function loadMore() {
  visibleCount.value += PAGE_SIZE
}
</script>

<template>
  <section class="mb-36">
    <div v-if="loading" class="flex justify-center items-center py-36">
      <div class="w-12 h-12 rounded-full border-4 border-yellow/30 border-t-yellow animate-spin" />
    </div>
    <div v-else-if="type === 'resource'" class="max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-auto px-6 lg:px-0">
      <HubResource v-for="resource in visibleResources" :key="resource.id" :resource="resource" />
    </div>
    <div v-else class="max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-auto mt-16 md:mt-32 px-6 lg:px-0">
      <div class="col-span-3 font-heading text-6xl mb-16 uppercase">{{ t.hub.ourPartners }}</div>
      <HubPartner v-for="partner in visiblePartners" :key="partner.id" :partner="partner" />
    </div>
    <div v-if="type === 'resource' ? hasMoreResources : hasMorePartners" class="flex justify-center mt-10">
      <button @click="loadMore" class="py-6 px-12 text-center uppercase font-heading text-xl rounded-md border">
        {{ t.hub.loadMore }}
      </button>
    </div>
  </section>
</template>
