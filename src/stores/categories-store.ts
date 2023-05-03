import { defineStore } from 'pinia'
import {ref, toRef, watch} from 'vue'
import type { Category, CreateCategoryDto } from '../api/categories-api'
import { categoriesApi } from '../api/categories-api'
import { useAuthStore } from './auth-store'
import {useLocalStorage} from "@vueuse/core";

export const useCategoriesStore = defineStore('categories', () => {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const data = ref<Category[]>([])
  const category = useLocalStorage<string|null>('category', null)

  // Update categories when auth status is changed
  watch(isAuthorized, async (isAuthorized) => {
    if (isAuthorized) {
        data.value = await categoriesApi.get()
        if (category.value === null && data.value.length > 0) {
          category.value = data.value[0].id
        }
    } else {
      data.value = []
      category.value = null
    }
  }, {immediate: true})

  const createCategory = async function (c: CreateCategoryDto) {
    const newCategory = await categoriesApi.create(c)

    data.value.push(newCategory)
    category.value = newCategory.id
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
    if (category.value === id) {
      category.value = data.value[0]?.id ?? null
    }
  }

  return {items: data, category, createCategory, updateCategory, deleteCategory}
})
