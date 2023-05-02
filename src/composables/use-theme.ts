import { useModal } from './use-modal'
import { toRaw } from 'vue'
import { useThemeStore } from '../stores/theme-store'

const themeModal = useModal(null)

export function useThemeModal() {
  const themeStore = useThemeStore()

  return {themeStore, ...themeModal}
}

export async function openThemeModal () {
  const themeStore = useThemeStore()

  const oldMode = toRaw(themeStore.colorMode)
  const oldIndex = toRaw(themeStore.colorIndex)

  try {
    await themeModal.openModal(null)
  } catch (e) {
    // Restore old values if modal was closed without saving
    themeStore.colorMode = oldMode
    themeStore.colorIndex = oldIndex
  }
}