<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section>
        <div class="flex flex-col max-w-2xl mx-auto gap-8 text-center items-center mb-36">
            <div class="text-6xl uppercase my-8 font-heading">
                <h4>{{ hub?.VideoTitle }}</h4>
            </div>
            <div class="flex flex-col gap-4">
                <p>{{ hub?.VideoIntro }}</p>
                <a :href="hub?.VideoURL" target="_blank">
                    <img v-if="hub?.VideoCover" :src="mediaUrl(hub.VideoCover.url)" :alt="hub.VideoCover.alternativeText ?? ''" />
                </a>
            </div>
        </div>
    </section>
</template>
