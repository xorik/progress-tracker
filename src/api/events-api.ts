import { httpClient } from './base-api'

export interface Event {
  id: string
  goalId: string
  time: string
  count: number
}

class EventsApi {
  public async create(event: Omit<Event, "id">): Promise<Event> {
    return httpClient.get('/api/events', 'POST', event)
  }
}

export const eventsApi = new EventsApi()
