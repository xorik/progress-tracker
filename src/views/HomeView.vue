<script setup lang="ts">
import { ref } from 'vue'
import { useGoalsStore } from '../stores/goals-store'
import { useHomepage } from '../composables/home'
import { useStatsStore } from '../stores/stats-store'

const category = ref<string|null>(null)
const goalsStore = useGoalsStore()
const statsStore = useStatsStore()
const {createEvent} = useHomepage()
</script>

<template>
  <div class="text-right">
    <CategorySelector v-model="category"/>
  </div>

  <template v-for="g in goalsStore.items">
    <div v-if="category === null || g.categoryId === category" class="my-2">
      <div class="flex items-center">
        <Icon :icon="g.icon" class="text-2xl mr-3 text-accent"/>
        <h3 class="text-xl">{{g.title}}</h3>
      </div>

      <div class="flex gap-4 text-right">
        <div>
          <div class="stat-title">Today</div>
          <div class="stat-value">{{statsStore.today[g.id] ?? 0}}</div>
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
          <div class="stat-value">{{statsStore.week[g.id] ?? 0}}</div>
          <div class="stat-desc">?%</div>
        </div>
        <div class="flex-1">
          <div class="btn-group w-full">
            <span class="btn btn-lg btn-outline btn-accent flex-1" @click="createEvent(g.id)">Track</span>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
