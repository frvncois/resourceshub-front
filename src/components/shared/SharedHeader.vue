<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import MainLogo from '@/assets/MainLogo.vue'
import { useContentStore } from '@/stores/content'
import type { Locale } from '@/api/strapi'

const content = useContentStore()
const { locale } = storeToRefs(content)
const route = useRoute()
const router = useRouter()

const locales: Locale[] = ['en', 'fr', 'es']

function switchLocale(lang: Locale) {
  const newPath = route.path.replace(/^\/(en|fr|es)/, `/${lang}`)
  router.push(newPath)
}
</script>

<template>
    <header class="flex fixed z-10 items-center justify-between w-full px-4 md:px-8 py-4">
        <MainLogo class="h-16 w-auto" />
        <nav class="flex gap-2">
            <button
                v-for="lang in locales"
                :key="lang"
                :class="['px-2 py-1 cursor-pointer text-yellow transition-opacity', locale === lang ? 'opacity-100' : 'opacity-50']"
                @click="switchLocale(lang)"
            >
                {{ lang.toUpperCase() }}
            </button>
        </nav>
    </header>
</template>
