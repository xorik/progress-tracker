<script setup lang="ts">
import {useCategoriesSettings} from "../../composables/use-settings";

const {categories, editCategory, createCategory, deleteCategory} = useCategoriesSettings()
</script>
<template>
  <div class="flex">
    <h3 class="flex-1">Categories</h3>
    <span class="btn btn-outline normal-case" @click="createCategory()"><i-ph-plus-light class="text-xl mr-2"/>Add category</span>
  </div>

  <div v-for="c in categories" class="flex items-center gap-2 my-2">
    <Icon :icon="c.icon" class="text-3xl"/>
    <span class="flex-1">{{c.title}}</span>
    <span class="btn btn-ghost px-2" @click="editCategory(c)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
    <span class="btn btn-ghost px-2 text-error" @click="deleteCategory(c)"><i-ph-trash-light class="text-xl"/></span>
  </div>
</template>