import { httpClient } from './base-api'

export interface StatItem {
  goalId: string
  eventCount: number
}

interface StatResponse {
  today: StatItem[]
  week: StatItem[]
}

class StatsApi {
  public async get(): Promise<StatResponse> {
    return httpClient.get('/api/stats')
  }
}

export const statsApi = new StatsApi()
