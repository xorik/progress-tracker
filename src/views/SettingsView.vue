<script setup lang="ts">
import { useCategoriesStore } from '../stores/categories-store'
import { useSettings } from '../composables/settings'

const categoriesStore = useCategoriesStore()
const {openCategoryModal, createCategory, deleteCategory} = useSettings()

</script>

<template>
  <h1>Settings</h1>

  <div class="flex">
    <h3 class="flex-1">Categories</h3>
    <span class="btn btn-outline normal-case" @click="createCategory()"><i-ph-plus-light class="text-xl mr-2"/>Add category</span>
  </div>

  <div v-for="c in categoriesStore.items" class="flex items-center gap-2 my-2">
    <Icon :icon="c.icon" class="text-3xl"/>
    <span class="flex-1">{{c.title}}</span>
    <span class="btn btn-ghost px-2" @click="openCategoryModal(c)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
    <span class="btn btn-ghost px-2 text-error" @click="deleteCategory(c.id)"><i-ph-trash-light class="text-xl"/></span>
  </div>

  <div class="flex mt-12">
    <h3 class="flex-1">Goals</h3>
    <span class="btn btn-outline normal-case"><i-ph-plus-light class="text-xl mr-2"/>Add goal</span>
  </div>

  <CategoryModal/>
  <IconModal/>
</template>
