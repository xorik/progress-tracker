<script setup lang="ts">
import { useGoalModalStore } from '../../stores/modal-store'
import { toRefs } from 'vue'
import { useCategoriesStore } from '../../stores/categories-store'

const {goal, resolve, isOpen, openIconModal} = toRefs(useGoalModalStore())
const categoriesStore = useCategoriesStore()
</script>

<template>
  <Modal id="goal-modal" v-model="isOpen">
    <h3 class="mb-12">Edit goal</h3>

    <div class="flex justify-center">
      <a class="btn btn-lg btn-outline" @click="openIconModal(goal.icon)">
        <Icon :icon="goal.icon" class="text-5xl"/>
      </a>
    </div>

    <label class="label">
      <span class="label-text">Title:</span>
    </label>
    <input type="text" v-model="goal.title" class="input input-bordered w-full max-w-md" />

    <label class="label">
      <span class="label-text">Category:</span>
    </label>
    <select v-model="goal.categoryId" class="select select-bordered w-full">
      <option v-for="c in categoriesStore.items" :value="c.id">{{c.title}}</option>
    </select>

    <div class="flex gap-3">
      <div class="flex-1">
        <label class="label">
          <span class="label-text">Goal type:</span>
        </label>
        <select v-model="goal.goalType" class="select select-bordered w-full">
          <option value="maximize">Maximize</option>
          <option value="minimize">Minimize</option>
        </select>
      </div>

      <div class="flex-1">
        <label class="label">
          <span class="label-text">Goal value:</span>
        </label>
        <input type="text" v-model.number="goal.goalValue" class="input input-bordered w-full max-w-md" />
      </div>
    </div>

    <div class="text-right mt-12">
      <span class="btn btn-primary btn-outline" @click="resolve(goal)"><i-ph-floppy-disk-light class="text-xl mr-2"/>Save</span>
    </div>
  </Modal>
</template>
