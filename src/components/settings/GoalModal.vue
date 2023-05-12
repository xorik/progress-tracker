<script setup lang="ts">
import {useGoalsModal} from "../../composables/use-settings";
import {useCategoriesStore} from "../../stores/categories-store";
import {ref} from "vue";

const categoriesStore = useCategoriesStore()
const {isNew, pickIcon, isOpen, data, resolve} = useGoalsModal()
const infoVisible = ref(false)
</script>

<template>
  <Modal id="goal-modal" v-model="isOpen">
    <h3 class="mb-12" v-if="isNew">Add goal</h3>
    <h3 class="mb-12" v-else>Edit goal</h3>

    <div class="flex justify-center">
      <a class="btn btn-lg btn-outline" @click="pickIcon(data.icon)">
        <Icon :icon="data.icon" class="text-5xl"/>
      </a>
    </div>

    <label class="label">
      <span class="label-text">Title:</span>
    </label>
    <input type="text" v-model="data.title" class="input input-bordered w-full" />

    <template v-if="categoriesStore.items.length > 1">
      <label class="label">
        <span class="label-text">Category:</span>
      </label>
      <select v-model="data.categoryId" class="select select-bordered w-full">
        <option v-for="c in categoriesStore.items" :value="c.id">{{c.title}}</option>
      </select>
    </template>

    <div class="flex gap-3">
      <div class="flex-1">
        <label class="label">
          <span class="label-text">Goal type:</span>
        </label>
        <select v-model="data.goalType" class="select select-bordered w-full">
          <option value="maximize">Maximize</option>
          <option value="minimize">Minimize</option>
        </select>
      </div>

      <div class="flex-1">
        <label class="label relative">
          <span class="label-text">Weekly target:</span>
          <span @click.prevent="infoVisible = !infoVisible" class="absolute right-0 cursor-pointer hover:scale-110"><i-ph-info class="text-2xl text-info"/></span>
        </label>
        <input type="text" v-model.number="data.goalValue" class="input input-bordered w-full" />
      </div>
    </div>

    <div v-show="infoVisible" class="mt-4 p-4 rounded-xl shadow-md bg-info/20">
      <div class="flex items-center gap-3 sm:gap-6">
        <i-ph-barbell-light class="text-3xl sm:text-4xl"/>
        <span class="text-sm flex-1">
          <span class="text-info">Example: Exercise daily.</span><br>
          Goal type: <b>Maximize</b>. Set a target for the number of exercise sessions per week.
        </span>
      </div>

      <div class="flex items-center gap-3 sm:gap-6 mt-6">
        <i-ph-coffee-light class="text-3xl sm:text-4xl"/>
        <span class="text-sm flex-1">
          <span class="text-info">Example: Reduce coffee consumption.</span><br>
          Goal type: <b>Minimize</b>. Set target to zero or a low number.
        </span>
      </div>
    </div>

    <div class="text-right mt-12">
      <span class="btn btn-primary btn-outline" @click="resolve(data)">
        <template v-if="isNew"><i-ph-plus-light class="text-xl mr-2"/>Create</template>
        <template v-else><i-ph-check-light class="text-xl mr-2"/>Save</template>
      </span>
    </div>
  </Modal>
</template>