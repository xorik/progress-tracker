import { eventsApi } from '../api/events-api'

export function useHomepage() {
  const createEvent = (goalId: string) => {
    eventsApi.create({
      count: 1,
      time: new Date().toISOString(),
      goalId
    })
  }

  return {createEvent}
}
