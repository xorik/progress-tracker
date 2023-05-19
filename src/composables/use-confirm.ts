import {useModal} from "./use-modal";
import {computed} from "vue";

export const enum ConfirmType {
    Delete,
    Logout
}

interface ConfirmData {
    header: string,
    text: string,
    type: ConfirmType,
}

export const confirmModal = useModal<ConfirmData, boolean>({
    header: '',
    text: '',
    type: ConfirmType.Delete,
})

export function useConfirmModal() {
    const buttonText = computed(() => {
        if (confirmModal.data.value.type === ConfirmType.Delete) {
            return 'Delete'
        }

        if (confirmModal.data.value.type === ConfirmType.Logout) {
            return 'Logout'
        }
    })

    return {buttonText, ...confirmModal}
}