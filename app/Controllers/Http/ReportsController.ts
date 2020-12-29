import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import {
  totalMonth,
  totalPerActivities,
  totalPerDays,
  totalPerMonth,
  totalPerProjects,
} from 'App/Querys/Report'

export default class ReportsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['month', 'year', 'info'])
    try {
      let res: any
      if (data.month && !data.info) {
        // Pega o total do mês
        let query = totalMonth.replace('replace_types', "'YYYY-MM'")
        res = await Database.rawQuery(query, [user.id, data.month])
      } else if (data.year && !data.info) {
        // Pega o total por mês
        let query = totalPerMonth.replace('replace_types', "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.year])
      } else if (data.info === 'projects') {
        // Total por projetos
        let query = totalPerProjects.replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.month ? data.month : data.year])
      } else if (data.info === 'activities') {
        // Total por atividades
        let query = totalPerActivities.replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.month ? data.month : data.year, 1])
      } else {
        // Retorna vazio
        let query = totalPerDays.replace('replace_types', data.month ? "'YYYY-MM'" : "'YYYY'")
        res = await Database.rawQuery(query, [user.id, data.month ? data.month : data.year])
      }
      return response.json(res.rows)
    } catch (error) {
      return response.status(500).json({ msg: 'Deu ruim', error })
    }
  }
}
