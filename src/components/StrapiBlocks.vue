<script setup lang="ts">
import type { StrapiBlock } from '@/api/types'

defineProps<{ blocks: StrapiBlock[] }>()

function text(block: StrapiBlock) {
  return block.children.map((c) => c.text).join('')
}
</script>

<template>
  <template v-for="(block, i) in blocks" :key="i">
    <component :is="`h${block.level}`" v-if="block.type === 'heading'">{{ text(block) }}</component>
    <p v-else-if="block.type === 'paragraph'">{{ text(block) }}</p>
  </template>
</template>
