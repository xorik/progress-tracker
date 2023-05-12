<script setup lang="ts">
import { openThemeModal } from '../composables/use-theme'
import {toRef} from "vue";
import {useAuthStore} from "../stores/auth-store";

const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
</script>

<template>
  <div class="navbar bg-neutral text-neutral-content fixed z-50">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-3xl"><i-game-icons-progression/></RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><span @click="openThemeModal"><i-ph-palette-light class="text-xl"/></span></li>
        <li><RouterLink :to="isAuthorized ? '/settings/goals' : '/settings/key'"><i-ph-gear-fine-light class="text-xl"/></RouterLink></li>
      </ul>
    </div>
  </div>
</template>