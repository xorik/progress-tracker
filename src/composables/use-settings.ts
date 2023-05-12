import { useCategoriesStore } from '../stores/categories-store'
import type { Category, CreateCategoryDto } from '../api/categories-api'
import { useGoalsStore } from '../stores/goals-store'
import type {CreateGoalDto, Goal} from '../api/goals-api'
import { httpClient } from '../api/base-api'
import { categoriesApi } from '../api/categories-api'
import { useAuthStore } from '../stores/auth-store'
import {computed, ref, toRef, watch} from 'vue'
import { useModal } from './use-modal'
import {iconModal} from "./use-icon-modal";

export function useSettings() {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const categories = toRef(useCategoriesStore(), 'items')
  const hasCategories = computed(() => categories.value.length > 0)

  return {isAuthorized, hasCategories}
}

const categoriesModal = useModal<CreateCategoryDto>({
  title: '',
  icon: 'flag-banner',
})

const goalsModal = useModal<CreateGoalDto>({
  title: '',
  icon: 'flag-banner',
  categoryId: '',
  goalType: 'maximize',
  goalValue: 0,
})

export function useCategoriesModal() {
  const pickIcon = async function (icon: string) {
    try {
      categoriesModal.data.value.icon = await iconModal.openModal(icon)
    } catch (e) {
    }
  }

  const isNew = ref(true)
  watch(categoriesModal.isOpen, open => {
    isNew.value = categoriesModal.data.value.title === ''
  })

  return {isNew, pickIcon, ...categoriesModal}
}

export function useGoalsModal() {
  const pickIcon = async function (icon: string) {
    try {
      goalsModal.data.value.icon = await iconModal.openModal(icon)
    } catch (e) {
    }
  }

  const isNew = ref(true)
  watch(goalsModal.isOpen, open => {
    isNew.value = goalsModal.data.value.title === ''
  })

  return {isNew, pickIcon, ...goalsModal}
}

export function useCategoriesSettings() {
  const categoriesStore = useCategoriesStore()
  const categories = toRef(categoriesStore, 'items')

  const editCategory = async function (category: Category) {
    try {
      const savedCategory = await categoriesModal.openModal({...category})
      await categoriesStore.updateCategory({id: category.id, ...savedCategory})
    } catch (e) {
    }
  }

  const createCategory = async function () {
    try {
      const newCategory = await categoriesModal.openModal({title: '', icon: 'flag-banner'})
      await categoriesStore.createCategory(newCategory)
    } catch (e) {
    }
  }

  const deleteCategory = async function (id: string) {
    await categoriesStore.deleteCategory(id)
  }

  return {categories, editCategory, createCategory, deleteCategory}
}

export function useGoalSettings() {
  const categoriesStore = useCategoriesStore()
  const goalsStore = useGoalsStore()
  const goals = computed(() => goalsStore.items.filter(g => g.categoryId === categoriesStore.category))

  const editGoal = async function (id: string, goal: Goal) {
    try {
      const savedCategory = await goalsModal.openModal({...goal})
      await goalsStore.updateGoal(id, savedCategory)
    } catch (e) {
    }
  }

  const createGoal = async function () {
    try {
      const newGoal = await goalsModal.openModal({
        title: '',
        icon: 'flag-banner',
        categoryId: categoriesStore.category!,
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

  return {goals, editGoal, createGoal, deleteGoal}
}

function maskUUID(uuid: string): string {
  const parts = uuid.split('-');

  const maskedParts = parts.map((part, index) => {
    if (index === 0) {
      return part;
    } else {
      return part.replace(/[0-9a-fA-F]/g, '*');
    }
  });

  return maskedParts.join('-');
}

export function useApiKeySettings() {
  const authStore = useAuthStore()
  const key = ref(authStore.apiKey ?? '')
  const showKey = ref(false)
  const isAuthorized = toRef(authStore, 'isAuthorized')
  const isInvalidKey = ref(false)

  const login = async function () {
    httpClient.setApiKey(key.value)
    isInvalidKey.value = false

    // Trying to use key, before saving it
    try {
      await categoriesApi.get()
      authStore.apiKey = key.value
    } catch (e) {
      httpClient.setApiKey(undefined)
      isInvalidKey.value = true
    }
  }

  const logout = async function() {
    key.value = ''
    authStore.apiKey = null
    httpClient.setApiKey(undefined)
  }

  return {login, logout, maskUUID, key, showKey, isInvalidKey, isAuthorized}
}