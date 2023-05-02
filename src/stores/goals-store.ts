import { defineStore } from 'pinia'
import {ref, toRef, watch} from 'vue'
import type { CreateGoalDto, Goal } from '../api/goals-api'
import { goalsApi } from '../api/goals-api'
import { useAuthStore } from './auth-store'

export const useGoalsStore = defineStore('goals', () => {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const data = ref<Goal[]>([])

  // Update goals when auth status is changed
  watch(isAuthorized, async (isAuthorized) => {
    if (isAuthorized) {
      data.value = await goalsApi.get()
    } else {
      data.value = []
    }
  }, {immediate: true})

  const createGoal = async function (goal: CreateGoalDto) {
    const newGoal = await goalsApi.create(goal)

    data.value.push(newGoal)
  }

  const updateGoal = async function (id: string, goal: CreateGoalDto) {
    const updatedGoal = await goalsApi.update(id, goal)

    const index = data.value.findIndex(i => i.id === id)
    data.value[index] = updatedGoal
  }

  const deleteGoal = async function (id: string) {
    await goalsApi.delete(id)

    const index = data.value.findIndex(i => i.id === id)
    data.value.splice(index, 1)
  }

  return {items: data, createGoal, updateGoal, deleteGoal}
})
