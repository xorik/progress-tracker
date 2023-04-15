<script setup lang="ts">
import { useCategoriesStore } from '../stores/categories-store'
import { useVModel } from '@vueuse/core'

const categoriesStore = useCategoriesStore()

const props = defineProps<{
  modelValue: string|null
}>()
const emit = defineEmits(['update:modelValue'])

const category = useVModel(props, 'modelValue', emit)
</script>

<template>
  <ul class="menu menu-horizontal bg-base-100 rounded-box shadow-md">
    <li><a @click="category = null" :class="{active: category === null}">All</a></li>
    <li v-for="c in categoriesStore.items">
      <a @click="category = c.id" :class="{active: category === c.id}">
        <Icon :icon="c.icon" class="text-xl"/>
      </a>
    </li>
  </ul>
</template>
