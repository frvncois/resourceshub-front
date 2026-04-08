<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import HubPartner from './HubPartner.vue'
import HubResource from './HubResource.vue'
import { fetchResources, fetchPartners } from '@/api/strapi'
import type { Resource, Partner } from '@/api/types'
import { useHubStore } from '@/stores/hub'
import { useContentStore } from '@/stores/content'

const props = defineProps<{ type: 'resource' | 'partner' }>()

const store = useHubStore()
const { locale } = storeToRefs(useContentStore())
const resources = ref<Resource[]>([])
const partners = ref<Partner[]>([])

async function load() {
  if (props.type === 'resource') {
    const res = await fetchResources(locale.value)
    resources.value = res.data
  } else {
    const res = await fetchPartners(locale.value)
    partners.value = res.data
  }
}

watch(locale, load, { immediate: true })

const filteredResources = computed(() => {
  return resources.value.filter((r) => {
    if (store.selectedAudience && !r.audiences.some((a) => a.name === store.selectedAudience))
      return false
    if (store.selectedCategory && !r.categories.some((c) => c.slug === store.selectedCategory))
      return false
    return true
  })
})
</script>

<template>
  <section>
    <div v-if="type === 'resource'" class="max-w-6xl grid grid-cols-3 gap-8 m-auto">
      <HubResource v-for="resource in filteredResources" :key="resource.id" :resource="resource" />
    </div>
    <div v-else class="grid grid-cols-2 gap-8">
      <HubPartner v-for="partner in partners" :key="partner.id" :partner="partner" />
    </div>
  </section>
</template>
