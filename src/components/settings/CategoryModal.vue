<script setup lang="ts">
import { useCategoriesModalStore } from '../../stores/modal-store'
import { toRefs } from 'vue'

const {icon, title, resolve, isOpen, openIconModal} = toRefs(useCategoriesModalStore())
</script>

<template>

<Modal id="category-modal" v-model="isOpen">
  <h3 class="mb-12">Edit category</h3>

  <div class="flex justify-center">
    <a class="btn btn-lg btn-outline" @click="openIconModal(icon)">
      <Icon :icon="icon" class="text-5xl"/>
    </a>
  </div>

  <label class="label">
    <span class="label-text">Title:</span>
  </label>
  <input type="text" v-model="title" class="input input-bordered w-full max-w-md" />

  <div class="text-right mt-12">
    <span class="btn btn-accent text" @click="resolve({icon, title})"><i-ph-floppy-disk-light class="text-xl mr-2"/>Save</span>
  </div>
</Modal>
</template>
