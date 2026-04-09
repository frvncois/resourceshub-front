<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

gsap.registerPlugin(ScrollTrigger)

const { hub } = storeToRefs(useContentStore())

const titleRef = ref<HTMLElement | null>(null)
const introRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLElement | null>(null)

const stopWatch = watch(hub, async (val) => {
  if (!val) return
  stopWatch()
  await nextTick()
  gsap.from([titleRef.value, introRef.value, videoRef.value].filter(Boolean), {
    y: '0.25em',
    opacity: 0,
    duration: 2,
    stagger: 0.15,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: titleRef.value,
      start: 'top 75%',
    },
  })
})
</script>

<template>
    <section class="bg-neutral-100 mx-auto py-16 md:py-36 px-6 lg:px-0 flex flex-col gap-16">
        <div class="flex flex-col md:flex-row max-w-6xl mx-auto gap-8 md:gap-16 items-center px-6 md:px-8">
            <div class="flex-1 flex flex-col gap-6 md:gap-8">
                <h4 ref="titleRef" class="text-3xl md:text-5xl uppercase font-heading">{{ hub?.VideoTitle }}</h4>
                <p ref="introRef" class="max-w-[40ch]">{{ hub?.VideoIntro }}</p>
            </div>
            <div ref="videoRef" class="w-full md:flex md:flex-[1.5] flex-col gap-4">
                <a :href="hub?.VideoURL" target="_blank">
                    <img v-if="hub?.VideoCover" :src="mediaUrl(hub.VideoCover.url)" :alt="hub.VideoCover.alternativeText ?? ''" />
                </a>
            </div>
        </div>
    </section>
</template>
