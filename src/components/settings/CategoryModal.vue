<script setup lang="ts">
import {useCategoriesModal} from "../../composables/use-settings";

const {isNew, pickIcon, isOpen, data, resolve} = useCategoriesModal()
</script>

<template>

<Modal id="category-modal" v-model="isOpen">
  <h3 class="mb-12" v-if="isNew">Add category</h3>
  <h3 class="mb-12" v-else>Edit category</h3>

  <div class="flex justify-center">
    <a class="btn btn-lg btn-outline" @click="pickIcon(data.icon)">
      <Icon :icon="data.icon" class="text-5xl"/>
    </a>
  </div>

  <label class="label">
    <span class="label-text">Title:</span>
  </label>
  <input type="text" v-model="data.title" class="input input-bordered w-full" />

  <div class="text-right mt-12">
    <span class="btn btn-primary btn-outline text" @click="resolve(data)">
      <template v-if="isNew"><i-ph-plus-light class="text-xl mr-2"/>Create</template>
      <template v-else><i-ph-check-light class="text-xl mr-2"/>Save</template>
    </span>
  </div>
</Modal>
</template>
