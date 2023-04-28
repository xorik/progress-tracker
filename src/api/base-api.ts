const baseUrl: string = import.meta.env.VITE_API_URL

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

class HttpClient {
  private apiKey: string|undefined = undefined

  public async get<T>(url: string, method: HttpMethod = 'GET', body: object|null = null): Promise<T> {
    const headers: Record<string, string> = {'content-type': 'application/json'}
    if (this.apiKey !== undefined) {
      headers['Authorization'] = 'Bearer ' + this.apiKey
    }

    const data = await fetch(baseUrl + url, {
      method: method,
      body: body !== null ? JSON.stringify(body): undefined,
      headers,
    })

    if (!data.ok) {
      throw new Error('API responded with HTTP code: ' + data.status)
    }

    return data.json()
  }

  public setApiKey(apiKey: string|undefined) {
    this.apiKey = apiKey
  }
}

export const httpClient = new HttpClient()
