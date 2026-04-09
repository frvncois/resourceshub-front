<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section class="bg-neutral-100">
        <div class="flex items-center flex-col py-16 md:py-36 px-6 space-y-8 md:space-y-12 text-center">
            <img class="w-40 md:w-100" v-if="hub?.CTALogo" :src="mediaUrl(hub.CTALogo.url)" :alt="hub.CTALogo.alternativeText ?? ''" />
            <p class="max-w-xl md:max-w-2xl">{{ hub?.CTAIntro }}</p>
            <a href="#" class="py-4 md:py-6 px-8 md:px-12 text-center uppercase font-heading text-lg md:text-xl rounded-md border">Let's learn</a>
        </div>
    </section>
</template>
