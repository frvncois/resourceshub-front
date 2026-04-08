<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section>
        <div class="relative z-1 flex h-screen overflow-hidden">
            <div class="flex flex-1 items-center">
                <img v-if="hub?.HeroLogo" :src="mediaUrl(hub.HeroLogo.url)" :alt="hub.HeroLogo.alternativeText ?? ''" />
            </div>
            <div class="flex flex-col flex-1 items-end justify-center gap-4">
                <h1 class="text-right text-6xl uppercase font-heading">{{ hub?.HeroTitle }}</h1>
                <h2>{{ hub?.HeroSubtitle }}</h2>
            </div>
        </div>
        <img v-if="hub?.HeroBackground" class="absolute h-screen inset-0 object-cover z-0" :src="mediaUrl(hub.HeroBackground.url)" :alt="hub.HeroBackground.alternativeText ?? ''" />
    </section>
</template>
