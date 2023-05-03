<script setup lang="ts">
import { useCategoriesStore } from '../stores/categories-store'
import { useAuthStore } from '../stores/auth-store'
import {useCategoriesSettings, useGoalSettings} from "../composables/use-settings";

// TODO: don't use store directly
const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const {goals, editGoal, createGoal, deleteGoal} = useGoalSettings()
const {editCategory, createCategory, deleteCategory} = useCategoriesSettings()
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

    <div v-for="g in goals" v-if="goals.length > 0" class="flex items-center gap-2 my-2">
      <Icon :icon="g.icon" class="text-3xl"/>
      <span class="flex-1">{{g.title}}</span>
      <span class="btn btn-ghost px-2" @click="editGoal(g.id, g)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
      <span class="btn btn-ghost px-2 text-error" @click="deleteGoal(g.id)"><i-ph-trash-light class="text-xl"/></span>
    </div>
    <i v-else class="flex items-center my-2"><i-ph-info-light class="text-2xl mr-2"/>No goals for the current category yet</i>
  </div>

  <div class="mb-12"/>

  <ApiKeySettings/>

  <div class="mb-4"/>

  <CategoryModal/>
  <GoalModal/>
  <IconModal/>
</template>
