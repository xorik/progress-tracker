<script setup lang="ts">
import { useGoalsStore } from '../stores/goals-store'
import { useStatsStore } from '../stores/stats-store'
import {useEvent} from "../composables/use-event";

const goalsStore = useGoalsStore()
const statsStore = useStatsStore()
const {category, lastAddedValues, trackCountLabel, createEvent, openEventModal} = useEvent()
</script>

<template>
  <template v-for="g in goalsStore.currentGoals">
    <div class="my-2">
      <div class="flex items-center">
        <Icon :icon="g.icon" class="text-2xl mr-3 text-primary"/>
        <h3 class="text-xl">{{g.title}}</h3>
      </div>

      <div class="flex gap-4 text-right items-center">
        <div>
          <div class="stat-title">Today</div>
          <div class="stat-value font-semibold">{{statsStore.today[g.id] ?? 0}}</div>
          <div class="stat-desc">
            <div class="flex">
              <i-ph-trophy-bold/>
              <i-ph-arrow-up-right-bold v-if="g.goalType === 'maximize'" class="mr-1"/>
              <i-ph-arrow-down-right-bold v-else class="mr-1"/>
              {{g.goalValue}}
            </div>
          </div>
        </div>
        <div>
          <div class="stat-title">Week</div>
          <div class="stat-value font-semibold">{{statsStore.week[g.id] ?? 0}}</div>
          <div class="stat-desc">?%</div>
        </div>
        <div class="flex-1">
          <div class="btn-group w-full">
            <span class="btn btn-lg btn-outline btn-primary flex-1 flex-nowrap flex flex-grow w-0 px-2" @click="createEvent(g.id)">
              <Icon :icon="g.icon" class="text-2xl mr-1 sm:mr-3 flex-shrink-0"/>
              <span class="flex min-w-0">
                <span class="truncate w-full">Track {{ trackCountLabel(g.id) }}</span>
              </span>
            </span>
            <span v-if="lastAddedValues[g.id] !== undefined" class="btn btn-lg btn-outline btn-primary px-2 md:px-4 border-l-0" @click="openEventModal(g.id)">
              <i-ph-dots-three-outline-fill/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>

  <EventModal/>
</template>