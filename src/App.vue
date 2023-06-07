<script setup lang="ts">
import {usePwaRefresh} from "./composables/use-pwa-refresh";

usePwaRefresh()
</script>

<template>
  <Navbar/>

  <div class="py-20 px-3 max-w-2xl mx-auto select-none">
    <RouterView/>
  </div>

  <ThemeModal/>
  <Confirm/>
  <CategorySelector/>
  <NotificationArea/>
</template>