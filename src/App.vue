<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router';
import SharedCTA from '@/components/shared/SharedCTA.vue';
import SharedFooter from '@/components/shared/SharedFooter.vue';
import SharedHeader from './components/shared/SharedHeader.vue';
import { useContentStore } from '@/stores/content'

const content = useContentStore()
onMounted(() => content.load())
</script>

<template>
  <main>
    <SharedHeader />
    <RouterView />
    <SharedCTA />
    <SharedFooter />
  </main>
</template>
