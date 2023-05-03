<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {ref, watch} from 'vue'

const props = defineProps<{
  id: string
  modelValue: boolean
  extraClass?: string
}>()
const emit = defineEmits(['update:modelValue'])

const isOpen = useVModel(props, 'modelValue', emit)

const contentVisible = ref(false)
watch(isOpen, newValue => {
  document.body.style.overflow = newValue ? "hidden" : ""
  if (newValue) {
    contentVisible.value = true
  } else {
    setTimeout(() => contentVisible.value = false, 300)
  }
})
</script>

<template>
  <input type="checkbox" :id="id" class="modal-toggle" v-model="isOpen"/>

  <label :for="id" class="modal backdrop-blur-sm cursor-pointer">
    <label class="modal-box" :class="extraClass" for="">
      <template v-if="contentVisible">
        <slot></slot>
      </template>
    </label>
  </label>
</template>
