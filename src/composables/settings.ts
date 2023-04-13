import { useCategoriesStore } from '../stores/categories-store'
import type { Category } from '../api/categories-api'
import { useCategoriesModalStore, useGoalModalStore } from '../stores/modal-store'
import { useGoalsStore } from '../stores/goals-store'
import type { CreateGoalDto, Goal } from '../api/goals-api'

export function useSettings() {
  const categoriesStore = useCategoriesStore()
  const goalsStore = useGoalsStore()
  const categoriesModalStore = useCategoriesModalStore()
  const goalsModalStore = useGoalModalStore()

  const editCategory = async function (category: Category) {
    try {
      const savedCategory = await categoriesModalStore.openModal(category)
      await categoriesStore.updateCategory({id: category.id, ...savedCategory})
    } catch (e) {
    }
  }

  const createCategory = async function () {
    try {
      const newCategory = await categoriesModalStore.openModal({title: '', icon: 'flag-banner'})
      await categoriesStore.createCategory(newCategory)
    } catch (e) {
    }
  }

  const deleteCategory = async function (id: string) {
    await categoriesStore.deleteCategory(id)
  }

  const editGoal = async function (id: string, goal: Goal) {
    try {
      const savedCategory = await goalsModalStore.openModal({categoryId: goal.category.id, ...goal})
      await goalsStore.updateGoal(id, savedCategory)
    } catch (e) {
    }
  }

  const createGoal = async function () {
    try {
      const newGoal = await goalsModalStore.openModal({
        title: '',
        icon: 'flag-banner',
        categoryId: categoriesStore.items[0].id,
        goalType: 'maximize',
        goalValue: 10
      })

      await goalsStore.createGoal(newGoal)
    } catch (e) {
    }
  }

  const deleteGoal = async function (id: string) {
    await goalsStore.deleteGoal(id)
  }


  return {editCategory, createCategory, deleteCategory, editGoal, createGoal, deleteGoal}
}
