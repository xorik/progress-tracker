import { eventsApi } from '../api/events-api'
import { useStatsStore } from '../stores/stats-store'
import {useCategoriesStore} from "../stores/categories-store";
import {toRef} from "vue";

export function useHomepage() {
  const statsStore = useStatsStore()
  const category = toRef(useCategoriesStore(), 'category')

  const createEvent = async (goalId: string) => {
    await eventsApi.create({
      count: 1,
      time: new Date().toISOString(),
      goalId
    })

    statsStore.updateStat(goalId, 1)
  }

  return {category, createEvent}
}