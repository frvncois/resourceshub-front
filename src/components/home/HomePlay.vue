<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'
import { useT } from '@/locales'

gsap.registerPlugin(ScrollTrigger)

const { hub } = storeToRefs(useContentStore())
const t = useT()

const coverRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const introRef = ref<HTMLElement | null>(null)

const stopWatch = watch(hub, async (val) => {
  if (!val) return
  stopWatch()
  await nextTick()
  gsap.from([coverRef.value, titleRef.value, introRef.value].filter(Boolean), {
    y: '0.25em',
    opacity: 0,
    duration: 2,
    stagger: 0.15,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: coverRef.value,
      start: 'top 75%',
    },
  })
})
</script>

<template>
    <section class="bg-black text-white mx-auto py-16 md:py-36 px-6 lg:px-0 flex flex-col gap-16">
        <div class="flex flex-col-reverse md:flex-row max-w-6xl mx-auto gap-8 md:gap-36 items-center px-6 md:px-8">
            <div ref="coverRef" class="w-full md:flex md:flex-[1.5] flex-col gap-4">
                <img class="rounded-md" v-if="hub?.PlayCover" :src="mediaUrl(hub.PlayCover.url)" :alt="hub.PlayCover.alternativeText ?? ''" />
            </div>
            <div class="flex-1 flex flex-col gap-6 md:gap-8">
                <h3 ref="titleRef" class="text-3xl md:text-5xl uppercase font-heading">{{ hub?.PlayTitle }}</h3>
                <p ref="introRef" class="max-w-[40ch]">{{ hub?.PlayIntro }}</p>
                <a class="py-4 md:py-6 px-8 md:px-12 text-center uppercase font-heading text-lg md:text-xl rounded-md border">{{ t.home.letsPlay }}</a>
            </div>
        </div>
    </section>
</template>
