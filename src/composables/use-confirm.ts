import {useModal} from "./use-modal";
import {computed} from "vue";

export const enum ConfirmType {
    Delete,
    Logout,
    NewVersion,
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
    const textMap = {
        [ConfirmType.Delete]: 'Delete',
        [ConfirmType.Logout]: 'Logout',
        [ConfirmType.NewVersion]: 'Reload',
    };

    const buttonText = computed(() => textMap[confirmModal.data.value.type])
    const buttonClass = computed(() => confirmModal.data.value.type === ConfirmType.NewVersion ? 'btn-primary' : 'btn-error')

    return {buttonText, buttonClass, ...confirmModal}
}