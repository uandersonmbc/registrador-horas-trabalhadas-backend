import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import WorkedHour from 'App/Models/WorkedHour'

export default class WorkedHoursController {
  public async index({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['start', 'end'])
    const {
      rows,
    } = await Database.rawQuery(
      `SELECT to_char(wh."start"::timestamp, 'IW') as week_number, SUM(wh."end"::timestamp - wh."start"::timestamp) AS total_number_hours FROM worked_hours wh WHERE user_id = ? AND "start" BETWEEN ? AND ? AND type_id = ? GROUP BY week_number`,
      [user.id, data.start, data.end, 1]
    )

    return response.json(rows)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await request.validate({
      schema: schema.create({
        project_id: schema.number(),
        type_id: schema.number(),
        start: schema.date(),
        end: schema.date(),
      }),
    })

    const data = request.only(['project_id', 'type_id', 'start', 'end', 'user_id'])
    data.user_id = user.id

    try {
      const workedHour = await WorkedHour.create(data)
      return response.json(workedHour)
    } catch (error) {
      return response.json({ msg: 'Deu ruim' })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['project_id', 'type_id', 'start', 'end'])

    try {
      const workedHours = await WorkedHour.query()
        .where('id', request.param('id'))
        .where('user_id', user.id)
        .update(data)
      return response.json({
        message: workedHours[0] ? 'Dados Atualizados' : 'Erro ao atualizar os dados ',
      })
    } catch (error) {
      return response.json({ message: 'Deu ruim' })
    }
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()

    try {
      const workedHours = await WorkedHour.query()
        .where('id', request.param('id'))
        .where('user_id', user.id)
        .delete()
      return response.json({
        message: workedHours[0] ? 'Registro apagado' : 'Erro ao apagar registro',
      })
    } catch (error) {
      return response.json({ message: 'Deu ruim' })
    }
  }
}
