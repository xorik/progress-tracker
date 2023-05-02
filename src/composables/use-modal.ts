import { ref, unref, watch} from 'vue'
import type { MaybeRef } from '@vueuse/core'


export function useModal<T> (initialData: MaybeRef<T>) {
  const data = ref(initialData)
  const isOpen = ref(false)
  const resolve = ref((value: T) => {})
  const reject = ref(() => {})
  let isResolved = false

  watch(isOpen, newValue => {
    if (!newValue && !isResolved) {
      reject.value()
    }
  })

  const openModal = async function (initData: MaybeRef<T>): Promise<T> {
    data.value = unref(initData)
    isOpen.value = true
    isResolved = false

    return new Promise((res, rej) => {
      resolve.value = function (value: T) {
        isResolved = true
        isOpen.value = false
        res(value)
      }

      reject.value = function () {
        isOpen.value = false
        rej()
      }
    })
  }

  return {openModal, isOpen, data, resolve, reject}
}
