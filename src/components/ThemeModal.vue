<script setup lang="ts">
import { useThemeModal} from "../composables/use-theme";

const {themeStore, isOpen, resolve} = useThemeModal()
</script>

<template>
<Modal id="theme-modal" v-model="isOpen">
  <h3>Color mode</h3>
  <div class="flex flex-col sm:flex-row sm:gap-8">
    <label class="label justify-start">
      <input type="radio" v-model="themeStore.colorMode" value="dark" class="radio radio-primary">
      <i-ph-moon-light class="text-2xl mx-2"/>
      <span class="label-text">Dark</span>
    </label>
    <label class="label justify-start">
      <input type="radio" v-model="themeStore.colorMode" value="light" class="radio radio-primary">
      <i-ph-sun-light class="text-2xl mx-2"/>
      <span class="label-text">Light</span>
    </label>
    <label class="label justify-start">
      <input type="radio" v-model="themeStore.colorMode" value="auto" class="radio radio-primary">
      <i-ph-desktop-light class="text-2xl mx-2"/>
      <span class="label-text">System</span>
    </label>
  </div>

  <h3>Theme color</h3>
  <div class="flex flex-wrap my-8" @mouseleave="themeStore.previewIndex = null">
    <span
        v-for="(c, i) in themeStore.currentModeColors"
        :style="{color: `hsl(${c})`}"
        @click.prevent="themeStore.colorIndex = i"
        @mouseenter="themeStore.previewIndex = i"
        class="text-5xl cursor-pointer"
    >
      <i-ph-circle-fill v-if="themeStore.colorIndex !== i"/>
      <i-ph-check-circle-fill v-else/>
    </span>
  </div>

  <div class="text-right mt-12">
    <span class="btn btn-primary btn-outline" @click="resolve(null)"><i-ph-check-light class="text-xl mr-2"/>Apply</span>
  </div>
</Modal>
</template>
