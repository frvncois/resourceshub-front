<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section class="">
        <div class="my-36 text-center space-y-8 w-2xl m-auto">
            <h1 class="font-heading text-6xl mb-16 uppercase">{{ hub?.WelcomeTitle }}</h1>
            <p>{{ hub?.WelcomeIntro }}</p>
        </div>
    </section>
</template>
