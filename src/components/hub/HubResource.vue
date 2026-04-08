<script setup lang="ts">
import type { Resource } from '@/api/types'
import { mediaUrl } from '@/api/strapi'
defineProps<{ resource: Resource }>()
</script>

<template>
    <div class="flex flex-col bg-gray-100 rounded-md overflow-hidden">
        <div class="relative aspect-square bg-black">
            <img v-if="resource.cover" :src="mediaUrl(resource.cover.url)" :alt="resource.cover.alternativeText ?? resource.name" class="w-full h-full object-cover" />
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div class="flex flex-1 flex-col justify-between p-8 gap-16">
            <div class="space-y-4 rounded-t-md overflow-hidden">
                <h3 class="font-heading uppercase text-2xl leading-none max-w-[20ch]">{{ resource.name }}</h3>
                <p class="text-sm text-gray-500">{{ resource.partner?.name }}</p>
            </div>
            <a :href="resource.url" class="border py-4 px-8 inline rounded-md text-center">View resource</a>
        </div>
    </div>
</template>
