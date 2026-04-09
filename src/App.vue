<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, RouterView } from 'vue-router';
import SharedCTA from '@/components/shared/SharedCTA.vue';
import SharedFooter from '@/components/shared/SharedFooter.vue';
import SharedHeader from './components/shared/SharedHeader.vue';
import { useContentStore } from '@/stores/content'
import type { Locale } from '@/api/strapi'

const content = useContentStore()
const route = useRoute()

watch(
  () => route.params.locale as Locale,
  (locale) => { if (locale) content.load(locale) },
  { immediate: true },
)
</script>

<template>
  <main>
    <SharedHeader />
    <RouterView />
    <SharedCTA />
    <SharedFooter />
  </main>
</template>
