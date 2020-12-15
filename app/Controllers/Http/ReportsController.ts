import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import { totalMonth, totalPerActivities, totalPerMonth, totalPerProjects } from 'App/Querys/Report'

export default class ReportsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['month', 'year', 'info'])
    try {
      let res: any
      if (data.month && !data.info && !data.info) {
        // Alguma coisa
        let query = totalMonth.replace('replace_types', "'YYYY-MM'")
        res = await Database.rawQuery(query, [user.id, data.month])
      } else if (data.year && !data.info && !data.info) {
        // Alguma coisa
        let query = totalPerMonth.replace('replace_types', "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.year])
      } else if (data.info === 'projects') {
        // Alguma coisa
        let query = totalPerProjects.replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.month ? data.month : data.year])
      } else if (data.info === 'activities') {
        // Alguma coisa
        let query = totalPerActivities.replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.month ? data.month : data.year, 1])
      } else {
        // Retorna vazio
        res.rows = []
      }
      return response.json(res.rows)
    } catch (error) {
      return response.status(500).json({ msg: 'Deu ruim', error })
    }
  }
}
