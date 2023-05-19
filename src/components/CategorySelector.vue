<script setup lang="ts">
import { useCategoriesStore } from '../stores/categories-store'
import {computed, toRefs} from "vue"
import {useRoute} from "vue-router"

// TODO: move to composables
const {items, category} = toRefs(useCategoriesStore())
const route = useRoute()
const visible = computed(() => !!route.meta.showCategories)
</script>

<template>
  <!-- Fake panel for background color for 100% width -->
  <div v-if="visible && items.length > 1" class="btm-nav bg-base-200">
  </div>

  <div v-if="visible && items.length > 1" class="btm-nav max-w-2xl mx-auto bg-base-200">
    <button
        v-for="c in items"
        class="hover:text-primary"
        :class="{'active text-primary': category === c.id}"
        @click="category = c.id"
    >
      <Icon :icon="c.icon" class="text-2xl"/>
    </button>
  </div>
</template>