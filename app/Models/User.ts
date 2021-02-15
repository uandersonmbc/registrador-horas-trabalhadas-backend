import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

import WorkedHour from 'App/Models/WorkedHour'
import BankHour from 'App/Models/BankHour'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    user.id = uuid()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => WorkedHour, {
    foreignKey: 'user_id',
  })
  public workedHours: HasMany<typeof WorkedHour>

  @hasOne(() => BankHour, {
    foreignKey: 'user_id',
  })
  public bankHours: HasOne<typeof BankHour>
}
