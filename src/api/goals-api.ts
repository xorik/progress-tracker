import type { Category } from './categories-api'

export interface Goal {
  id: string
  title: string
  icon: string
  category: Category
  goalType: 'maximize'|'minimize'
  goalValue: number
}

export interface CreateGoalDto {
  title: string
  icon: string
  categoryId: string
  goalType: 'maximize'|'minimize'
  goalValue: number
}

class GoalsApi {
  public async get(): Promise<Goal[]> {
    const data = await fetch('https://progress.xorik.dev/api/goals')

    return data.json()
  }

  public async create(goal: CreateGoalDto): Promise<Goal> {
    const data = await fetch('https://progress.xorik.dev/api/goals', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(goal)
    })

    return data.json()
  }

  public async update(id: string, goal: CreateGoalDto): Promise<Goal> {
    const data = await fetch('https://progress.xorik.dev/api/goals/' + id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(goal)
    })

    return data.json()
  }

  public async delete(id: string): Promise<void> {
    await fetch('https://progress.xorik.dev/api/goals/' + id, {
      method: 'DELETE',
    })

    return
  }
}

export const goalsApi = new GoalsApi()
