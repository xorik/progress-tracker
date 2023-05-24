import { httpClient } from './base-api'

export interface Category {
  id: string
  title: string
  icon: string
  pos: number
}

export type CreateCategoryDto = Omit<Category, "id" | "pos">

class CategoriesApi {
  public async get(): Promise<Category[]> {
    return httpClient.get('/api/categories')
  }

  public async create(category: CreateCategoryDto): Promise<Category> {
    return httpClient.get('/api/categories', 'POST', category)
  }

  public async update(id: string, category: CreateCategoryDto): Promise<Category> {
    return httpClient.get('/api/categories/' + id, 'PUT', category)
  }

  public async delete(id: string): Promise<void> {
    return httpClient.get('/api/categories/' + id, 'DELETE')
  }

  public async sort(ids: string[]): Promise<void> {
    return httpClient.get('/api/categories/sort', 'POST', ids)
  }
}

export const categoriesApi = new CategoriesApi()