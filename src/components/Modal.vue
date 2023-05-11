<script setup lang="ts">
import {ref, watch} from 'vue'

defineProps<{
  id: string
  extraClass?: string
}>()

const isOpen = defineModel<boolean>({required: true})

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