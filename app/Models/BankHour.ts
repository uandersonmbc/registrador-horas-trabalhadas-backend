import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BankHour extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ isPrimary: true })
  public amount_hours: number

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
