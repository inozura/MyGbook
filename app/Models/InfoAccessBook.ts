import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Bookmark from './Bookmark'

export default class InfoAccessBook extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bookmarkId: number

  @column()
  public country: string

  @column()
  public viewability: string

  @column()
  public embeddable: boolean

  @column()
  public publicDomain: boolean

  @column()
  public textToSpeechPermission: string

  @column()
  public epub: string

  @column()
  public pdf: string

  @column()
  public webReaderLink: string

  @column()
  public accessViewStatus: string

  @column()
  public quoteSharingAllowed: boolean

  @belongsTo(() => Bookmark)
  public bookmark: BelongsTo<typeof Bookmark>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
