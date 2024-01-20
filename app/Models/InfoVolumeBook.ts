import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Bookmark from './Bookmark'

export default class InfoVolumeBook extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bookmarkId: number

  @column()
  public title: string

  @column({ serializeAs: null }) // Do not serialize authors for simplicity
  public authors: string

  @column()
  public publisher: string

  @column()
  public publishedDate: string

  @column()
  public description: string

  @column()
  public pageCount: number

  @column()
  public printedPageCount: number

  @column()
  public printType: string

  @column()
  public categories: string

  @column()
  public maturityRating: string

  @column()
  public allowAnonLogging: boolean

  @column()
  public contentVersion: string

  @column()
  public panelizationSummary: string

  @column()
  public readingModes: string

  @column()
  public imageLinks: string

  @column()
  public language: string

  @column()
  public previewLink: string

  @column()
  public infoLink: string

  @column()
  public canonicalVolumeLink: string

  @belongsTo(() => Bookmark)
  public bookmark: BelongsTo<typeof Bookmark>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
