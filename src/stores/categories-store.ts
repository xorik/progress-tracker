import { defineStore } from 'pinia'
import {ref, toRef, watch} from 'vue'
import type { Category, CreateCategoryDto } from '../api/categories-api'
import { categoriesApi } from '../api/categories-api'
import { useAuthStore } from './auth-store'

export const useCategoriesStore = defineStore('categories', () => {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const data = ref<Category[]>([])

  // Update categories when auth status is changed
  watch(isAuthorized, async (isAuthorized) => {
    if (isAuthorized) {
        data.value = await categoriesApi.get()
    } else {
      data.value = []
    }
  }, {immediate: true})

  const createCategory = async function (category: CreateCategoryDto) {
    const newCategory = await categoriesApi.create(category)

    data.value.push(newCategory)
  }

  const updateCategory = async function (category: Category) {
    const updatedCategory = await categoriesApi.update(category)

    const index = data.value.findIndex(i => i.id === category.id)
    data.value[index] = updatedCategory
  }

  const deleteCategory = async function (id: string) {
    await categoriesApi.delete(id)

    const index = data.value.findIndex(i => i.id === id)
    data.value.splice(index, 1)
  }

  return {items: data, createCategory, updateCategory, deleteCategory}
})
