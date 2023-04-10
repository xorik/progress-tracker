<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps<{
  id: string
  modelValue: boolean
  extraClass?: string
}>()
const emit = defineEmits(['update:modelValue'])

const isOpen = useVModel(props, 'modelValue', emit)
watch(isOpen, newValue => {
  document.body.style.overflow = newValue ? "hidden" : ""
})
</script>

<template>
  <input type="checkbox" :id="id" class="modal-toggle" v-model="isOpen"/>

  <label :for="id" class="modal cursor-pointer">
    <label class="modal-box" :class="extraClass" for="">
      <slot></slot>
    </label>
  </label>
</template>
