import { httpClient } from './base-api'

export interface Event {
  id: string
  goalId: string
  time: string
  count: number
}

export type CreateEventDto = Omit<Event, "id">

class EventsApi {
  public async create(event: CreateEventDto): Promise<Event> {
    return httpClient.get('/api/events', 'POST', event)
  }
}

export const eventsApi = new EventsApi()
