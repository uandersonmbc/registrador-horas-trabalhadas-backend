import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import BankHour from 'App/Models/BankHour'

import { amountPerMonth, total, totalPer, totalPerProjects } from 'App/Querys/Report'

export default class ReportsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['month', 'year', 'info'])
    await user.preload('bankHours')

    try {
      let res: any = {}

      let queryTotal = total.replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
      let data1 = (await Database.rawQuery(queryTotal, [user.id, data.month || data.year])).rows[0]

      let queryTotalPer = totalPer
        .replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
        .replace('replace_format', data.month ? 'DD' : 'MM')
        .replace(/replace_type_group/g, data.month ? 'day' : 'month')

      let data2 = (await Database.rawQuery(queryTotalPer, [user.id, data.month || data.year])).rows

      let queryTotalPerProjects = totalPerProjects.replace(
        'replace_types',
        data.month ? "'YYYY-MM'" : "'YYYY'"
      )
      let data3 = (
        await Database.rawQuery(queryTotalPerProjects, [user.id, data.month || data.year])
      ).rows

      let data4 = (
        await Database.rawQuery(amountPerMonth, [(data.month || data.year).split('-')[0]])
      ).rows

      res = Object.assign(res, data1)
      res = Object.assign(res, { total_per: data2 })
      res = Object.assign(res, { total_per_projects: data3 })
      res = Object.assign(res, { amount: data4 })
      res = Object.assign(res, {
        bankHours: {
          total: user.bankHours.amount_hours,
          update: user.bankHours.updatedAt,
        },
      })

      return response.json(res)
    } catch (error) {
      return response.status(500).json({
        msg: 'Não foi possível buscar os dados',
        error: { message: error.message },
      })
    }
  }
}
