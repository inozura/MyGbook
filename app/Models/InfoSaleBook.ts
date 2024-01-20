import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Bookmark from './Bookmark'

export default class InfoSaleBook extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bookmarkId: number

  @column()
  public country: string

  @column()
  public saleability: string

  @column()
  public isEbook: boolean

  @column()
  public listPrice: string

  @column()
  public retailPrice: string

  @column()
  public buyLink: string

  @column()
  public offers: string

  @belongsTo(() => Bookmark)
  public bookmark: BelongsTo<typeof Bookmark>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
