<script setup lang="ts">
import {useEventModal} from "../composables/use-event";

const {date, time, previousValues, timeOptions, isOpen, data, goal, setTime, submit} = useEventModal()
</script>

<template>
<Modal id="track-modal" v-model="isOpen" extra-class="max-w-sm">
    <div v-if="goal" class="flex items-center">
        <Icon :icon="goal.icon" class="text-2xl mr-3 text-primary"/>
        <h3 class="text-xl">{{goal.title}}</h3>
    </div>


  <label class="label">
    <span class="label-text">Value:</span>
  </label>
  <input type="text" v-model.number="data.count" class="input input-bordered w-full">

  <div v-if="previousValues[data.goalId] && previousValues[data.goalId].length > 1" class="mt-4">
    <div v-for="v in previousValues[data.goalId]" @click="data.count = v" class="badge badge-lg badge-outline cursor-pointer mx-1">{{ v }}</div>
  </div>

  <label class="label mt-4">
    <span class="label-text">Event time:</span>
  </label>
  <div class="tabs tabs-boxed flex-nowrap overflow-auto compact">
    <span v-for="(t, key) in timeOptions" @click="setTime(key)" class="tab" :class="{'text-primary': t.active}">{{key}}</span>
  </div>

  <div class="flex gap-4 mt-8">
    <input type="date" v-model="date" class="input input-bordered w-full">
    <input type="time" v-model="time" class="input input-bordered w-full">
  </div>

  <div v-if="goal" class="text-right mt-12">
      <span @click="submit()" class="btn btn-primary btn-outline px-12">
          <Icon :icon="goal.icon" class="text-2xl mr-3"/>
          Track
      </span>
  </div>
</Modal>
</template>