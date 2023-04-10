import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '../api/categories-api'
import { categoriesApi } from '../api/categories-api'

export const useCategoriesStore = defineStore('categories', () => {
  const data = ref<Category[]>([])
  categoriesApi.get().then(categories => {
    data.value = categories
  })

  const createCategory = async function (category: Omit<Category,"id">) {
    const newCategory = await categoriesApi.create(category)

    data.value!.push(newCategory)
  }

  const updateCategory = async function (category: Category) {
    const updatedCategory = await categoriesApi.update(category)

    const index = data.value!.findIndex(i => i.id === category.id)
    data.value![index] = updatedCategory
  }

  const deleteCategory = async function (id: string) {
    await categoriesApi.delete(id)

    const index = data.value!.findIndex(i => i.id === id)
    data.value!.splice(index, 1)
  }

  return {items: data, createCategory, updateCategory, deleteCategory}
})
