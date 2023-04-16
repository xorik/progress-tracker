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
    const data = await fetch('https://progress.xorik.dev/api/stats')

    return data.json()
  }
}

export const statsApi = new StatsApi()
