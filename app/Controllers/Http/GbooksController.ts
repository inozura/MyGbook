import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GBook from 'App/Services/GBook'

export default class GbooksController {
  public async search({ request, response }: HttpContextContract) {
    const { query, page, perPage } = request.qs()

    if (!query) return response.status(403).json({ message: 'query is required' })

    try {
      const gbook = new GBook()
      const search = await gbook.fetch(query, {
        startIndex: page ?? '0',
        maxResults: perPage ?? '10',
      })

      return response.status(200).json({ message: 'success', data: search })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
