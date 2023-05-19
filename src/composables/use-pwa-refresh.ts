import {registerSW} from 'virtual:pwa-register'
import {confirmModal, ConfirmType} from "./use-confirm";

export function usePwaRefresh() {
  const updateSW = registerSW({
    async onNeedRefresh() {
      try {
        await confirmModal.openModal({
          header: 'New version is available',
          text: 'Click "Reload" to apply',
          type: ConfirmType.NewVersion,
        })

        updateSW()
      } catch (e) {
      }
    },
    onOfflineReady() {},
    onRegisteredSW(url, r) {
      // Check for updates every hour
      r && setInterval(() => r.update(), 60 * 60 * 1000)
    }
  })
}