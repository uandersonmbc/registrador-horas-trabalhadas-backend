import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import WorkedHour from 'App/Models/WorkedHour'

import { dayWeek, week, weekTotal } from 'App/Querys/WorkedHour'

export default class WorkedHoursController {
  public async index({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['start', 'end', 'weekTotal'])
    try {
      let res: any
      if (data.start && data.end === undefined) {
        res = await Database.rawQuery(dayWeek, [user.id, data.start])
      } else if (data.start && data.end && !data.weekTotal) {
        res = await Database.rawQuery(week, [user.id, data.start, data.end])
      } else {
        res = await Database.rawQuery(weekTotal, [user.id, data.start, data.end])
      }
      return response.json(res.rows)
    } catch (error) {
      return response.status(error.status).json({ msg: 'Deu ruim', error })
    }
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
      return response.status(error.status).json({ msg: 'Deu ruim' })
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
      return response.status(error.status).json({ message: 'Deu ruim' })
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
      return response.status(error.status).json({ message: 'Deu ruim' })
    }
  }
}
