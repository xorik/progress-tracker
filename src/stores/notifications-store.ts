import {defineStore} from "pinia";
import {ref} from "vue";

interface Button {
  text: string
  action: () => void
}

interface Notification {
  id: string
  icon: string
  text: string
  buttons: Button[]
}

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])

  const findById = (id: string): Notification|undefined => notifications.value.find(n => n.id === id)

  const addNotification = (icon: string, text: string, buttons: Button[]) => {
    const id = crypto.randomUUID()

    notifications.value.push({
      id,
      icon,
      text,
      buttons,
    })

    // Remove notification after timeout
    setTimeout(() => {
      removeNotification(id)
    }, 10000)
  }

  const removeNotification = (id: string) => {
    notifications.value.splice(notifications.value.findIndex(n => n.id === id), 1)
  }

  return {notifications, findById, addNotification, removeNotification}
})