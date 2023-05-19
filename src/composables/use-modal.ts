import { ref, unref, watch} from 'vue'
import type { MaybeRef } from '@vueuse/core'


export function useModal<T, V=T> (initialData: MaybeRef<T>) {
  const data = ref(initialData)
  const isOpen = ref(false)
  const resolve = ref((value: V) => {})
  const reject = ref(() => {})
  let isResolved = false

  watch(isOpen, newValue => {
    if (!newValue && !isResolved) {
      reject.value()
    }
  })

  const openModal = async function (initData: MaybeRef<T>): Promise<V> {
    data.value = unref(initData)
    isOpen.value = true
    isResolved = false

    return new Promise((res, rej) => {
      resolve.value = function (value: V) {
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