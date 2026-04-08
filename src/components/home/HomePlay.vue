<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section>
        <div class="flex flex-col">
            <div class="text-6xl uppercase py-8 bg-black text-white text-center font-heading">
                <h3>{{ hub?.PlayTitle }}</h3>
            </div>
            <div class="flex flex-col bg-black text-white -mx-24 px-24 items-center justify-center pt-8 pb-16">
                <div class="flex max-w-5xl gap-24">
                    <div class="flex-1 bg-white">
                        <img v-if="hub?.PlayCover" :src="mediaUrl(hub.PlayCover.url)" :alt="hub.PlayCover.alternativeText ?? ''" />
                    </div>
                    <div class="flex flex-col gap-8 flex-1">
                        <p>{{ hub?.PlayIntro }}</p>
                        <a>Let's play</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
