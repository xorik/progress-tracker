import {useModal} from "./use-modal";
import type {CreateEventDto} from "../api/events-api";
import {useStatsStore} from "../stores/stats-store";
import {computed, ref, toRef, watch, watchEffect} from "vue";
import {useCategoriesStore} from "../stores/categories-store";
import {eventsApi} from "../api/events-api";
import {usePreviousValues} from "./use-previous-values";
import {useGoalsStore} from "../stores/goals-store";

const eventModal = useModal<CreateEventDto>({
    goalId: '',
    time: new Date().toISOString(),
    count: 1
})

export function useEventModal() {
    const {previousValues} = usePreviousValues()
    const date = ref('')
    const time = ref('')

    const goalStore = useGoalsStore()
    const goal = computed(() => goalStore.getGoalById(eventModal.data.value.goalId))

    const timeOptions = ref({
        'Now': {hours: 0, active: false },
        '30m': {hours: 0.5, active: false },
        '1h': {hours: 1, active: false },
        '2h': {hours: 2, active: false },
        '3h': {hours: 3, active: false },
        '6h': {hours: 6, active: false },
        '9h': {hours: 9, active: false },
        '12h': {hours: 12, active: false },
    })

    type TimeOptionKey = keyof typeof timeOptions.value
    let oldKey: TimeOptionKey = 'Now'
    let dateChanged = false

    const updateDateFromString = (newDate: string) => {
        const d = new Date(newDate)
        date.value = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
        time.value = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    }

    // Reset current time and interval selector on modal open
    watchEffect(() => {
        updateDateFromString(eventModal.data.value.time)
        timeOptions.value[oldKey].active = false
        timeOptions.value['Now'].active = true
        oldKey = 'Now'
        dateChanged = false
    })

    watch([time, date], () => {
        dateChanged = true
    })

    const setTime = (key: TimeOptionKey): void => {
        const currentDate = new Date()
        const pastDate = new Date(currentDate.getTime() - (timeOptions.value[key].hours * 60 * 60 * 1000))
        updateDateFromString(pastDate.toISOString())
        timeOptions.value[oldKey].active = false
        timeOptions.value[key].active = true
        oldKey = key
        dateChanged = true
    }

    // Combine date + time input format into ISO string
    const combineDateAndTime = (): string => {
        const [year, month, day] = date.value.split('-').map(Number)
        const [hours, minutes] = time.value.split(':').map(Number)
        return new Date(year, month - 1, day, hours, minutes).toISOString()
    }

    const submit = () => {
        // Keep time when modal was opened, if time and date wasn't changed
        const time = dateChanged ? combineDateAndTime(): eventModal.data.value.time

        eventModal.resolve.value({
            ...eventModal.data.value,
            time,
        })
    }

    return {date, time, previousValues, timeOptions, goal, setTime, submit, ...eventModal}
}

export function useEvent() {
    const statsStore = useStatsStore()
    const goalStore = useGoalsStore()
    const category = toRef(useCategoriesStore(), 'category')
    const {lastAddedValues, addValue} = usePreviousValues()

    const openEventModal = async (goalId: string) => {
        const count= lastAddedValues.value[goalId] ?? 1

        try {
            const data = await eventModal.openModal({
                time: new Date().toISOString(),
                count,
                goalId,
            })

            await eventsApi.create(data)
            statsStore.updateStat(goalId, data.count)
            addValue(goalId, data.count)
        } catch (e) {
        }
    }

    const createEvent = async (goalId: string) => {
        const count= lastAddedValues.value[goalId]
        if (count === undefined) {
            await openEventModal(goalId)
            return
        }

        await eventsApi.create({
            count,
            time: new Date().toISOString(),
            goalId,
        })

        statsStore.updateStat(goalId, count)
    }

    const trackCountLabel = (goalId: string) => {
        const v = lastAddedValues.value[goalId]
        const goal = goalStore.getGoalById(goalId)

        if (v === undefined) {
            return '...'
        }

        return v === 1 && goal?.unit === null ? '' : `+${v} ${goal?.unit ?? ''}`
    }

    return {category, trackCountLabel, createEvent, openEventModal}
}