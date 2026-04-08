<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'
import StrapiBlocks from '@/components/StrapiBlocks.vue'

const { hub } = storeToRefs(useContentStore())
</script>

<template>
    <section>
        <div class="flex flex-col max-w-2xl mx-auto my-24 gap-8 text-center items-center">
            <StrapiBlocks v-if="hub?.IntroContent" :blocks="hub.IntroContent" />
            <RouterLink to="/hub" class="border rounded-md px-8 py-4 my-8">Click here to visit the Resource Hub</RouterLink>
        </div>
    </section>
</template>
