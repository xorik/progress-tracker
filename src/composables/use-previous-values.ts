import { useLocalStorage } from '@vueuse/core'
import {computed} from "vue";

type PreviousValuesType = {
    [key: string]: number[]
}

export function usePreviousValues() {
    const previousValues = useLocalStorage<PreviousValuesType>('previousValues', {})

    const addValue = (goalId: string, value: number) => {
        if (!previousValues.value[goalId]) {
            previousValues.value[goalId] = []
        }

        const index = previousValues.value[goalId].indexOf(value)
        if (index > -1) {
            previousValues.value[goalId].splice(index, 1)
        }

        previousValues.value[goalId].unshift(value)

        if (previousValues.value[goalId].length > 10) {
            previousValues.value[goalId].pop()
        }
    }

    const lastAddedValues = computed(() => {
        let result: { [key: string]: number } = {}

        for (const goalId in previousValues.value) {
            if (previousValues.value[goalId].length > 0) {
                result[goalId] = previousValues.value[goalId][0]
            }
        }

        return result
    })

    return { previousValues, addValue, lastAddedValues }
}