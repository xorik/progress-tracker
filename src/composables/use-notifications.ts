import {toRef} from "vue";
import {useNotificationsStore} from "../stores/notifications-store";

export function useNotifications() {
  let notificationsStore = useNotificationsStore();
  const notifications = toRef(notificationsStore, 'notifications')

  const clickButton = (notificationId: string, buttonIndex: number) => {
    const notification = notificationsStore.findById(notificationId)
    if (notification === undefined) {
      return
    }

    notification.buttons[buttonIndex].action()
    notificationsStore.removeNotification(notificationId)
  }

  return {notifications, clickButton}
}