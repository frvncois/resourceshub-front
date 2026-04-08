<script setup lang="ts">
import type { Partner } from '@/api/types'
import { mediaUrl } from '@/api/strapi'
defineProps<{ partner: Partner }>()
</script>

<template>
    <div class="flex flex-col bg-gray-100 rounded-md overflow-hidden">
        <div class="aspect-square">
            <img v-if="partner.logo" :src="mediaUrl(partner.logo.url)" :alt="partner.logo.alternativeText ?? partner.name" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col justify-between h-50 pl-8 pb-8">
            <div class="bg-gray-100 -mt-8 p-4 space-y-4 rounded-tl-md overflow-hidden">
                <h3 class="font-heading uppercase">{{ partner.name }}</h3>
                <p class="text-sm text-gray-500">{{ partner.country?.name }}</p>
                <p class="text-sm text-gray-500">{{ partner.description }}</p>
            </div>
            <div>
                <a :href="partner.url" class="border py-4 px-8 inline">Learn more</a>
            </div>
        </div>
    </div>
</template>
