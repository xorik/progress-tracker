import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateGoalDto, Goal } from '../api/goals-api'
import { goalsApi } from '../api/goals-api'

export const useGoalsStore = defineStore('goals', () => {
  const data = ref<Goal[]>([])
  goalsApi.get().then(goals => {
    data.value = goals
  })

  const createGoal = async function (goal: CreateGoalDto) {
    const newGoal = await goalsApi.create(goal)

    data.value!.push(newGoal)
  }

  const updateGoal = async function (id: string, goal: CreateGoalDto) {
    const updatedGoal = await goalsApi.update(id, goal)

    const index = data.value!.findIndex(i => i.id === id)
    data.value![index] = updatedGoal
  }

  const deleteGoal = async function (id: string) {
    await goalsApi.delete(id)

    const index = data.value!.findIndex(i => i.id === id)
    data.value!.splice(index, 1)
  }

  return {items: data, createGoal, updateGoal, deleteGoal}
})
