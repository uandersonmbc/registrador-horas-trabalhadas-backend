import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Month extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public year: number

  @column()
  public month: number

  @column()
  public amount_hours: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
