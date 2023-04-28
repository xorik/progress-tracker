<script setup lang="ts">
import { useCategoriesStore } from '../stores/categories-store'
import { useSettings } from '../composables/settings'
import { useGoalsStore } from '../stores/goals-store'
import { useAuthStore } from '../stores/auth-store'

const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const goalsStore = useGoalsStore()
const {editCategory, createCategory, deleteCategory, editGoal, createGoal, deleteGoal} = useSettings()

</script>

<template>
  <h1>Settings</h1>

  <div class="flex" v-if="authStore.isAuthorized">
    <h3 class="flex-1">Categories</h3>
    <span class="btn btn-outline normal-case" @click="createCategory()"><i-ph-plus-light class="text-xl mr-2"/>Add category</span>
  </div>

  <div v-for="c in categoriesStore.items" class="flex items-center gap-2 my-2">
    <Icon :icon="c.icon" class="text-3xl"/>
    <span class="flex-1">{{c.title}}</span>
    <span class="btn btn-ghost px-2" @click="editCategory(c)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
    <span class="btn btn-ghost px-2 text-error" @click="deleteCategory(c.id)"><i-ph-trash-light class="text-xl"/></span>
  </div>

  <div v-if="categoriesStore.items.length > 0">
    <div class="flex mt-12">
      <h3 class="flex-1">Goals</h3>
      <span class="btn btn-outline normal-case" @click="createGoal"><i-ph-plus-light class="text-xl mr-2"/>Add goal</span>
    </div>

    <div v-for="g in goalsStore.items" class="flex items-center gap-2 my-2">
      <Icon :icon="g.icon" class="text-3xl"/>
      <span class="flex-1">{{g.title}}</span>
      <span class="btn btn-ghost px-2" @click="editGoal(g.id, g)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
      <span class="btn btn-ghost px-2 text-error" @click="deleteGoal(g.id)"><i-ph-trash-light class="text-xl"/></span>
    </div>
  </div>

  <ApiKeySettings/>

  <CategoryModal/>
  <GoalModal/>
  <IconModal/>
</template>
