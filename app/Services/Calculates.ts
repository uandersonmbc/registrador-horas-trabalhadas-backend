import Database from '@ioc:Adonis/Lucid/Database'
import { total, amountPerMonth } from 'App/Querys/Report'

export default class Calculates {
  public async cal(user: any) {
    try {
      let queryTotal = total.replace('replace_types', "'YYYY-MM'")

      let data1 = await Database.rawQuery(queryTotal, [user.id, '2021-02'])
      let data4 = (await Database.rawQuery(amountPerMonth, ['2021'])).rows
      return { result: data1.rows[0], total: data4 }
    } catch (error) {
      console.log(error)
      return { teste: 'ruim' }
    }
  }
}
