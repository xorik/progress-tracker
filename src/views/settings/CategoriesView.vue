<script setup lang="ts">
import {useCategoriesSettings} from "../../composables/use-settings";
import {ref} from "vue";

const el = ref<HTMLElement | null>(null)
const {categories, editCategory, createCategory, deleteCategory} = useCategoriesSettings(el)
</script>
<template>
  <div class="flex">
    <h3 class="flex-1">Categories</h3>
    <span class="btn btn-outline normal-case" @click="createCategory()"><i-ph-plus-light class="text-xl mr-2"/>Add category</span>
  </div>

  <div ref="el">
    <div v-for="c in categories" :key="c.id" class="flex items-center gap-2 my-2">
      <Icon :icon="c.icon" class="text-3xl"/>
      <span class="flex-1">{{c.title}}</span>
      <span class="btn btn-ghost px-2" @click="editCategory(c)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
      <span class="btn btn-ghost px-2 text-error" @click="deleteCategory(c)"><i-ph-trash-light class="text-xl"/></span>
      <div class="handle cursor-grab"><i-ph-list-light class="text-3xl mr-2"/></div>
    </div>
  </div>
</template>