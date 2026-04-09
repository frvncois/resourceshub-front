<script setup lang="ts">
import type { Partner } from '@/api/types'
import { mediaUrl } from '@/api/strapi'
import { useT } from '@/locales'
defineProps<{ partner: Partner }>()
const t = useT()
</script>

<template>
    <div class="flex flex-col bg-neutral-100 rounded-md overflow-hidden">
        <div class="aspect-square w-40 m-auto my-16">
            <img v-if="partner.logo" :src="mediaUrl(partner.logo.url)" :alt="partner.logo.alternativeText ?? partner.name" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col justify-between flex-1 -auto gap-8 p-8 pb-8">
            <div class="bg-gray-100 -mt-8 py-4 space-y-4 rounded-tl-md overflow-hidden">
                <h3 class="font-heading uppercase text-2xl">{{ partner.name }}</h3>
                <p class="text-sm text-gray-500">{{ partner.country?.name }}</p>
                <p class="text-sm text-gray-500">{{ partner.description }}</p>
            </div>
            <a :href="partner.url" target="_blank" class="border py-4 px-8 inline rounded-md text-center">{{ t.hub.learnMore }}</a>
        </div>
    </div>
</template>
