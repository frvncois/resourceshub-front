<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section>
        <div class="flex items-center flex-col p-36 space-y-12 text-center">
            <img v-if="hub?.CTALogo" :src="mediaUrl(hub.CTALogo.url)" :alt="hub.CTALogo.alternativeText ?? ''" />
            <p>{{ hub?.CTAIntro }}</p>
            <a href="#" class="border py-4 px-8 inline">Let's learn</a>
        </div>
    </section>
</template>
