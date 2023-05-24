import { defineStore } from 'pinia'
import {computed, ref, toRaw, toRef, watch, watchEffect} from 'vue'
import type { CreateGoalDto, Goal } from '../api/goals-api'
import { goalsApi } from '../api/goals-api'
import { useAuthStore } from './auth-store'
import {useCategoriesStore} from "./categories-store";

export const useGoalsStore = defineStore('goals', () => {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const currentCategory = toRef(useCategoriesStore(), 'category')
  const data = ref<Goal[]>([])

  // Update goals when auth status is changed
  watch(isAuthorized, async isAuthorized => {
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

  const getGoalById = (id: string): Goal | undefined => {
    return data.value.find(goal => goal.id === id)
  }

  const currentGoals = computed(
    () => data.value
      .filter(g => g.categoryId === currentCategory.value)
      .sort((a, b) => a.pos - b.pos)
  )

  const sortGoals = async (oldIndex: number, newIndex: number) => {
    const ids = currentGoals.value.map(g => g.id)

    const [removed] = ids.splice(oldIndex, 1);
    ids.splice(newIndex, 0, removed);

    await goalsApi.sort(ids)
    ids.forEach((id, index) => getGoalById(id)!.pos = index)
  }

  return {items: data, currentGoals, sortGoals, getGoalById, createGoal, updateGoal, deleteGoal}
})