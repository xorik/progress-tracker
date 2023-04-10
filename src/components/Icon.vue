<script setup lang="ts">
import icons from '../assets/icons.json'

defineProps<{
  icon: keyof typeof icons
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256" v-html="icons[icon].body"></svg>
</template>
