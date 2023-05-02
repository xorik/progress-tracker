import { httpClient } from './base-api'

export interface Category {
  id: string
  title: string
  icon: string
}

export type CreateCategoryDto = Omit<Category, "id">

class CategoriesApi {
  public async get(): Promise<Category[]> {
    return httpClient.get('/api/categories')
  }

  public async create(category: CreateCategoryDto): Promise<Category> {
    return httpClient.get('/api/categories', 'POST', category)
  }

  public async update(category: Category): Promise<Category> {
    return httpClient.get('/api/categories/' + category.id, 'PUT', category)
  }

  public async delete(id: string): Promise<void> {
    return httpClient.get('/api/categories/' + id, 'DELETE')
  }
}

export const categoriesApi = new CategoriesApi()
