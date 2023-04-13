import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import type { Category } from '../api/categories-api'
import type { CreateGoalDto, Goal } from '../api/goals-api'
import { useCategoriesStore } from './categories-store'

const useModalStore = function<T> (initFn: (input: T) => void = () => {}) {
  const resolve = ref<(value: T) => void>(() => {})
  const reject = ref<() => void>(() => {})
  const isOpen = ref(false)
  let isResolved = false

  // Reject promise if modal closed without resolving
  watch(isOpen, newValue => {
    if (!newValue && !isResolved) {
      reject.value!()
    }
  })

  function openModal(input: T): Promise<T> {
    isResolved = false
    isOpen.value = true
    initFn(input)

    return new Promise<T>((res, rej) => {
      resolve.value = function (value: T) {
        isOpen.value = false
        res(value)
        isResolved = true
      }

      reject.value = function () {
        isOpen.value = false
        rej()
      }
    })
  }

  return {resolve, reject, openModal, isOpen}
}

export const useIconModalStore = defineStore('icon-modal', () => {
  const icon = ref('')
  const {resolve, reject, openModal, isOpen} = useModalStore<string>(t => {
    icon.value = t
  })

  return {icon, resolve, reject, openModal, isOpen}
})

export const useCategoriesModalStore = defineStore('categories-modal', () => {
  const iconModalStore = useIconModalStore()
  const icon = ref('flag-banner')
  const title = ref('')

  const {resolve, reject, openModal, isOpen} = useModalStore<Omit<Category, "id">>(c => {
    icon.value = c.icon
    title.value = c.title
  })

  const openIconModal = async function (i: string) {
    try {
      icon.value = await iconModalStore.openModal(i)
    } catch (e) {
    }
  }

  return {icon, title, resolve, reject, openModal, isOpen, openIconModal}
})

export const useGoalModalStore = defineStore('goal-modal', () => {
  const iconModalStore = useIconModalStore()
  const goal = reactive<CreateGoalDto>({
    title: '',
    icon: 'flag-banner',
    categoryId: '',
    goalType: 'maximize',
    goalValue: 10
  })

  const {resolve, reject, openModal, isOpen} = useModalStore<CreateGoalDto>(g => {
    goal.title = g.title
    goal.icon = g.icon
    goal.categoryId = g.categoryId
    goal.goalType = g.goalType
    goal.goalValue = g.goalValue
  })

  const openIconModal = async function (i: string) {
    try {
      goal.icon = await iconModalStore.openModal(i)
    } catch (e) {
    }
  }

  return {goal, resolve, reject, openModal, isOpen, openIconModal}
})
