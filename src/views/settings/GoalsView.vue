<script setup lang="ts">
import {useGoalSettings} from "../../composables/use-settings";

const {goals, editGoal, createGoal, deleteGoal} = useGoalSettings()
</script>

<template>
  <div class="flex">
    <h3 class="flex-1">Goals</h3>
    <span class="btn btn-outline normal-case" @click="createGoal"><i-ph-plus-light class="text-xl mr-2"/>Add goal</span>
  </div>

  <div v-for="g in goals" v-if="goals.length > 0" class="flex items-center gap-2 my-2">
    <Icon :icon="g.icon" class="text-3xl"/>
    <span class="flex-1">{{g.title}}</span>
    <span class="btn btn-ghost px-2" @click="editGoal(g.id, g)"><i-ph-pencil-simple-line-light class="text-xl"/></span>
    <span class="btn btn-ghost px-2 text-error" @click="deleteGoal(g)"><i-ph-trash-light class="text-xl"/></span>
  </div>
  <i v-else class="flex items-center my-2"><i-ph-info-light class="text-2xl mr-2"/>No goals for the current category yet</i>
</template>