<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContentStore } from '@/stores/content'
import { useT } from '@/locales'
import type { StrapiBlock } from '@/api/types'

gsap.registerPlugin(ScrollTrigger)

const { hub, locale } = storeToRefs(useContentStore())
const t = useT()

function text(block: StrapiBlock) {
  return block.children.map((c) => c.text).join('')
}

const headingIndex = computed(() =>
  hub.value?.IntroContent.findIndex((b) => b.type === 'heading') ?? -1
)

const beforeHeading = computed(() =>
  headingIndex.value >= 0 ? hub.value!.IntroContent.slice(0, headingIndex.value) : []
)

const heading = computed(() =>
  headingIndex.value >= 0 ? hub.value!.IntroContent[headingIndex.value] : null
)

const afterHeading = computed(() =>
  headingIndex.value >= 0 ? hub.value!.IntroContent.slice(headingIndex.value + 1) : []
)

const beforeRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const afterRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

const stopWatch = watch(hub, async (val) => {
  if (!val) return
  stopWatch()
  await nextTick()
  gsap.from([beforeRef.value, headingRef.value, afterRef.value, ctaRef.value].filter(Boolean), {
    y: '0.25em',
    opacity: 0,
    duration: 2,
    stagger: 0.15,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: beforeRef.value,
      start: 'top 75%',
    },
  })
})
</script>

<template>
  <section class="bg-neutral-100 py-16 md:py-24 px-6 lg:px-0">
    <div ref="beforeRef" v-if="beforeHeading.length" class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 max-w-6xl m-auto">
      <p v-for="(block, i) in beforeHeading" :key="i" class="font-body text-base leading-relaxed">
        {{ text(block) }}
      </p>
    </div>
  </section>
  <section class="flex flex-col items-center mx-auto py-16 md:py-36 px-6 lg:px-0 gap-8 bg-white">

    <!-- Heading -->
    <component
      :is="`h${heading?.level ?? 2}`"
      ref="headingRef"
      v-if="heading"
      class="font-heading text-4xl md:text-6xl uppercase leading-10 md:leading-12 text-yellow w-[16ch] text-center mb-8"
    >
      {{ text(heading) }}
    </component>

    <!-- Last 2 paragraphs: 2 columns -->
    <div ref="afterRef" v-if="afterHeading.length" class="flex flex-col gap-8 text-center w-full max-w-2xl mb-8 px-6 md:px-0">
      <p v-for="(block, i) in afterHeading" :key="i" :class="i === afterHeading.length - 1 ? 'text-xs max-w-[50ch] mx-auto' : ''">
        {{ text(block) }}
      </p>
    </div>

    <!-- CTA -->
    <div ref="ctaRef" class="flex justify-center">
      <RouterLink :to="`/${locale}/hub`" class="bg-white py-6 px-12 text-center uppercase font-heading text-xl rounded-md border">
        {{ t.home.visitHub }}
      </RouterLink>
    </div>

  </section>
</template>
