import { defineStore } from 'pinia'
import {computed, ref, toRef, watch} from 'vue'
import type { Category, CreateCategoryDto } from '../api/categories-api'
import { categoriesApi } from '../api/categories-api'
import { useAuthStore } from './auth-store'
import {useLocalStorage} from "@vueuse/core";

export const useCategoriesStore = defineStore('categories', () => {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const data = ref<Category[]>([])
  const category = useLocalStorage<string|null>('category', null)
  const itemsSorted = computed(() => data.value.sort((a, b) => a.pos - b.pos))

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

  const updateCategory = async function (id: string, category: CreateCategoryDto) {
    const updatedCategory = await categoriesApi.update(id, category)

    const index = data.value.findIndex(i => i.id === id)
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

  const sortCategories = async (oldIndex: number, newIndex: number) => {
    const ids = itemsSorted.value.map(c => c.id)

    const [removed] = ids.splice(oldIndex, 1);
    ids.splice(newIndex, 0, removed);

    await categoriesApi.sort(ids)
    ids.forEach((id, index) => data.value.find(c => c.id === id)!.pos = index)
  }

  return {items: itemsSorted, category, sortCategories, createCategory, updateCategory, deleteCategory}
})