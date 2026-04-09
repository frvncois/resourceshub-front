<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MainLogo from '@/assets/MainLogo.vue'
import { useContentStore } from '@/stores/content'
import type { Locale } from '@/api/strapi'

const content = useContentStore()
const { locale } = storeToRefs(content)

const locales: Locale[] = ['en', 'fr', 'es']
</script>

<template>
    <header class="flex fixed z-10 items-center justify-between w-full px-4 md:px-8 py-4">
        <MainLogo class="h-16 w-auto" />
        <nav class="flex gap-2">
            <button
                v-for="lang in locales"
                :key="lang"
                :class="['px-2 py-1 cursor-pointer text-yellow-400 transition-opacity', locale === lang ? 'opacity-100' : 'opacity-50']"
                @click="content.load(lang)"
            >
                {{ lang.toUpperCase() }}
            </button>
        </nav>
    </header>
</template>
