export interface Category {
  id: string
  title: string
  icon: string
}

class CategoriesApi {
  public async get(): Promise<Category[]> {
    const data = await fetch('http://127.0.0.1:8000/api/categories')

    return data.json()
  }

  public async create(category: Omit<Category,"id">): Promise<Category> {
    const data = await fetch('http://127.0.0.1:8000/api/categories', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(category)
    })

    return data.json()
  }

  public async update(category: Category): Promise<Category> {
    const data = await fetch('http://127.0.0.1:8000/api/categories/' + category.id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(category)
    })

    return data.json()
  }

  public async delete(id: string): Promise<void> {
    await fetch('http://127.0.0.1:8000/api/categories/' + id, {
      method: 'DELETE',
    })

    return
  }
}

export const categoriesApi = new CategoriesApi()
