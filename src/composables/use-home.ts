import { eventsApi } from '../api/events-api'
import { useStatsStore } from '../stores/stats-store'

export function useHomepage() {
  const statsStore = useStatsStore()

  const createEvent = async (goalId: string) => {
    await eventsApi.create({
      count: 1,
      time: new Date().toISOString(),
      goalId
    })

    statsStore.updateStat(goalId, 1)
  }

  return {createEvent}
}