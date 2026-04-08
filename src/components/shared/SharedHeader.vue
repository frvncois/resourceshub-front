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
    <header>
        <MainLogo/>
        <nav>
            <button
                v-for="lang in locales"
                :key="lang"
                :class="{ active: locale === lang }"
                @click="content.load(lang)"
            >
                {{ lang.toUpperCase() }}
            </button>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em;
    svg {
        height: 4em;
        width: auto;
    }
}

nav {
    display: flex;
    gap: 0.5rem;
}

button {
    padding: 0.25rem 0.5rem;
    opacity: 0.5;
    cursor: pointer;
    font-weight: bold;
}

button.active {
    opacity: 1;
}
</style>
