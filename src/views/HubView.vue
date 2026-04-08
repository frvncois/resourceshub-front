<script setup lang="ts">
import HubFilter from '@/components/hub/HubFilter.vue';
import HubHero from '@/components/hub/HubHero.vue';
import HubList from '@/components/hub/HubList.vue';

</script>

<template>
    <HubHero />
    <HubFilter />
    <HubList type="resource" />
    <HubList type="partner" />
</template>