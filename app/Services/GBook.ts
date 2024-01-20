import Env from '@ioc:Adonis/Core/Env'
import { GbookInterface } from './interface'

export default class GBook {
  private apiKey = Env.get('GOOGLE_APIKEY')

  public async fetch(
    query: string,
    { startIndex, maxResults }: { startIndex?: string; maxResults?: string }
  ): Promise<GbookInterface | undefined> {
    try {
      const request = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex ? startIndex : 0}&maxResults=${maxResults ? maxResults : 20}&key=${this.apiKey}`,
        {
          method: 'GET',
        }
      )

      if (request.status === 200) {
        const data = await request.json()

        return data as GbookInterface
      }
    } catch (error) {
      return error
    }
  }

  public async fetchDetailById(id: string): Promise<GbookInterface | undefined> {
    try {
      const request = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${this.apiKey}`,
        {
          method: 'GET',
        }
      )

      if (request.status === 200) {
        const data = await request.json()

        return data as GbookInterface
      }
    } catch (error) {
      return error
    }
  }
}
