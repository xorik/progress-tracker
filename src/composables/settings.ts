import { useCategoriesStore } from '../stores/categories-store'
import type { Category } from '../api/categories-api'
import { useCategoriesModalStore } from '../stores/modal-store'

export function useSettings() {
  const categoriesStore = useCategoriesStore()
  const categoriesModalStore = useCategoriesModalStore()

  const openCategoryModal = async function (category: Category) {
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

  return {openCategoryModal, createCategory, deleteCategory}
}
