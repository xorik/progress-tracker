export interface Event {
  id: string
  goalId: string
  time: string
  count: number
}

class EventsApi {
  public async create(category: Omit<Event, "id">): Promise<Event> {
    const data = await fetch('https://progress.xorik.dev/api/events', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(category)
    })

    return data.json()
  }
}

export const eventsApi = new EventsApi()
