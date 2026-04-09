<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section class="bg-neutral-100 py-36">
        <div class="text-center space-y-8 w-2xl m-auto">
            <h1 class="font-heading text-4xl md:text-6xl uppercase leading-10 md:leading-12">{{ hub?.WelcomeTitle }}</h1>
            <p>{{ hub?.WelcomeIntro }}</p>
        </div>
    </section>
</template>
