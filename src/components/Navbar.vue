<script setup lang="ts">
import { openThemeModal } from '../composables/use-theme'
</script>

<template>
  <div class="navbar bg-neutral text-neutral-content fixed z-50">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-3xl"><i-game-icons-progression/></RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><span @click="openThemeModal"><i-ph-palette-light class="text-xl"/></span></li>
        <li><RouterLink to="/settings"><i-ph-gear-fine-light class="text-xl"/></RouterLink></li>
      </ul>
    </div>
  </div>
</template>
