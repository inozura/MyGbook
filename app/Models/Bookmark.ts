import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import InfoVolumeBook from './InfoVolumeBook'
import InfoSaleBook from './InfoSaleBook'
import InfoAccessBook from './InfoAccessBook'

export default class Bookmark extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_gbook: string

  @column()
  public kind: string

  @column()
  public etag: string

  @column()
  public selfLink: string

  @hasOne(() => InfoVolumeBook)
  public volumeInfo: HasOne<typeof InfoVolumeBook>

  @hasOne(() => InfoSaleBook)
  public saleInfo: HasOne<typeof InfoSaleBook>

  @hasOne(() => InfoAccessBook)
  public accessInfo: HasOne<typeof InfoAccessBook>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
