<script setup lang="ts">
import {useGoalSettings} from "../../composables/use-settings";
import {ref} from "vue";

const el = ref<HTMLElement | null>(null)
const {goals, editGoal, createGoal, deleteGoal} = useGoalSettings(el)
</script>

<template>
  <div class="flex">
    <h3 class="flex-1">Goals</h3>
    <span class="btn btn-outline normal-case" @click="createGoal"><i-ph-plus-light class="text-xl mr-2"/>Add goal</span>
  </div>

  <div ref="el">
    <div v-if="goals.length > 0" v-for="g in goals" :key="g.id" class="flex items-center gap-2 my-2">
      <Icon :icon="g.icon" class="text-3xl"/>
      <span class="flex-1">{{g.title}}</span>
      <span class="btn btn-ghost px-2" @click="editGoal(g.id, g)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
      <span class="btn btn-ghost px-2 text-error" @click="deleteGoal(g)"><i-ph-trash-light class="text-xl"/></span>
      <div class="handle cursor-grab"><i-ph-list-light class="text-3xl mr-2"/></div>
    </div>
  </div>
  <i v-if="goals.length === 0" class="flex items-center my-2"><i-ph-info-light class="text-2xl mr-2"/>No goals for the current category yet</i>
</template>