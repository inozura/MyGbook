import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bookmark from 'App/Models/Bookmark'
import GBook from 'App/Services/GBook'

export default class BookmarksController {
  /**
   * Index
   * for get all list bookmark
   */
  public async index({ request, response }: HttpContextContract) {
    const { page, perPage } = request.qs()

    try {
      const data = await Bookmark.query()
        .preload('volumeInfo')
        .preload('saleInfo')
        .preload('accessInfo')
        .paginate(parseInt(page ?? 1), parseInt(perPage ?? 10))

      if (data.length === 0)
        return response.status(200).json({ message: 'success retrive data', data: [] })

      response.status(200).json({ message: 'success retrive data', data })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  /**
   * Create
   * for new row from gbook id
   */
  public async create({ request, response }: HttpContextContract) {
    const { gbookId } = request.body()

    if (!gbookId) return response.status(403).json({ message: 'Gbook Id is required' })

    const gbook = new GBook()
    const bookmark = new Bookmark()

    try {
      // fefch data from API
      const detail = await gbook.fetchDetailById(gbookId)

      // check
      if (!detail)
        return response.status(404).json({ message: `Undefined book with title ${gbookId}` })

      const checkDuplicateBook = await Bookmark.findBy('id_gbook', gbookId)

      if (checkDuplicateBook)
        return response.status(401).json({ message: `You already save this book` })

      // assign create new ro to bookmark, volumeInfo, saleInfo, accessInfo model
      bookmark.id_gbook = detail.id
      bookmark.kind = detail.kind
      bookmark.etag = detail.etag
      bookmark.selfLink = detail.selfLink
      await bookmark.save()

      await bookmark.related('volumeInfo').create({
        title: detail.volumeInfo.title,
        authors: JSON.stringify(detail.volumeInfo.authors),
        publisher: detail.volumeInfo.publisher,
        publishedDate: detail.volumeInfo.publishedDate,
        description: detail.volumeInfo.description,
        pageCount: detail.volumeInfo.pageCount,
        printedPageCount: detail.volumeInfo.printedPageCount,
        printType: detail.volumeInfo.printType,
        categories: JSON.stringify(detail.volumeInfo.categories),
        maturityRating: detail.volumeInfo.maturityRating,
        allowAnonLogging: detail.volumeInfo.allowAnonLogging,
        contentVersion: detail.volumeInfo.contentVersion,
        panelizationSummary: JSON.stringify(detail.volumeInfo.panelizationSummary),
        readingModes: JSON.stringify(detail.volumeInfo.readingModes),
        imageLinks: JSON.stringify(detail.volumeInfo.imageLinks),
        language: detail.volumeInfo.language,
        previewLink: detail.volumeInfo.previewLink,
        infoLink: detail.volumeInfo.infoLink,
        canonicalVolumeLink: detail.volumeInfo.canonicalVolumeLink,
      })

      await bookmark.related('saleInfo').create({
        country: detail.saleInfo.country,
        saleability: detail.saleInfo.saleability,
        isEbook: detail.saleInfo.isEbook,
        listPrice: JSON.stringify(detail.saleInfo.listPrice),
        retailPrice: JSON.stringify(detail.saleInfo.retailPrice),
        buyLink: detail.saleInfo.buyLink,
        offers: JSON.stringify(detail.saleInfo.offers),
      })

      await bookmark.related('accessInfo').create({
        country: detail.accessInfo.country,
        viewability: detail.accessInfo.viewability,
        embeddable: detail.accessInfo.embeddable,
        publicDomain: detail.accessInfo.publicDomain,
        textToSpeechPermission: detail.accessInfo.textToSpeechPermission,
        epub: JSON.stringify(detail.accessInfo.epub),
        pdf: JSON.stringify(detail.accessInfo.pdf),
        webReaderLink: detail.accessInfo.webReaderLink,
        accessViewStatus: detail.accessInfo.accessViewStatus,
        quoteSharingAllowed: detail.accessInfo.quoteSharingAllowed,
      })

      return response
        .status(200)
        .json({ message: 'success saved to bookmark', data: bookmark.toJSON() })
    } catch (error) {
      console.log(error)

      return response.status(500).json({ message: error })
    }
  }

  /**
   * Destroy
   * delete bookmark by id
   */
  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.body()

    if (!id) return response.status(403).json({ message: 'Id bookmark is required' })

    try {
      const data = await Bookmark.findBy('id', id)

      if (!data) return response.status(200).json({ message: 'data not found' })

      // delete from db
      await data.delete()

      response.status(200).json({ message: 'success delete data' })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
