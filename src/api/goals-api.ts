import type { Category } from './categories-api'
import { httpClient } from './base-api'

export interface Goal {
  id: string
  title: string
  icon: string
  categoryId: string
  goalType: 'maximize'|'minimize'
  goalValue: number
}

export type CreateGoalDto = Omit<Goal, "id">

class GoalsApi {
  public async get(): Promise<Goal[]> {
    return httpClient.get('/api/goals')
  }

  public async create(goal: CreateGoalDto): Promise<Goal> {
    return httpClient.get('/api/goals', 'POST', goal)
  }

  public async update(id: string, goal: CreateGoalDto): Promise<Goal> {
    return httpClient.get('/api/goals/' + id, 'PUT', goal)
  }

  public async delete(id: string): Promise<void> {
    return httpClient.get('/api/goals/' + id, 'DELETE')
  }
}

export const goalsApi = new GoalsApi()
