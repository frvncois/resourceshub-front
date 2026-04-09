<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { useContentStore } from '@/stores/content'
import { mediaUrl } from '@/api/strapi'

const { hub } = storeToRefs(useContentStore())

const sectionRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLImageElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const coverRef = ref<HTMLImageElement | null>(null)

const onScroll = () => {
  if (!coverRef.value) return
  coverRef.value.style.opacity = String(Math.max(0, 1 - window.scrollY / window.innerHeight))
}

const stopWatch = watch(hub, async (val) => {
  if (!val) return
  stopWatch()
  await nextTick()

  const tl = gsap.timeline()

  tl.from(sectionRef.value, {
    clipPath: 'inset(0% 0% 100% 0%)',
    duration: 1,
    ease: 'power4.inOut',
  }).from(
    [logoRef.value, titleRef.value].filter(Boolean),
    {
      y: '1em',
      opacity: 0,
      duration: 0.75,
      stagger: 0.25,
      ease: 'power4.out',
    },
    '-=0.3'
  )
})

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
    <section ref="sectionRef" class="sticky top-0 -z-1 overflow-hidden bg-black">
        <div class="relative z-1 flex flex-col md:flex-row h-screen overflow-hidden p-6 md:p-12">
            <div class="flex flex-1 items-center justify-center md:justify-start">
                <img ref="logoRef" class="h-24 md:h-50" v-if="hub?.HeroLogo" :src="mediaUrl(hub.HeroLogo.url)" :alt="hub.HeroLogo.alternativeText ?? ''" />
            </div>
            <div ref="titleRef" class="flex flex-col flex-1 items-center md:items-end justify-center gap-4 text-white">
                <h1 class="text-center md:text-right text-4xl md:text-7xl uppercase font-heading max-w-[14ch]">{{ hub?.HeroTitle }}</h1>
                <h2 class="text-sm md:text-base text-center md:text-right">{{ hub?.HeroSubtitle }}</h2>
            </div>
        </div>
        <img ref="coverRef" v-if="hub?.HeroBackground" class="absolute w-full h-full inset-0 object-cover z-0" :src="mediaUrl(hub.HeroBackground.url)" :alt="hub.HeroBackground.alternativeText ?? ''" />
    </section>
</template>
