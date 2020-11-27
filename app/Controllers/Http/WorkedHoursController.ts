import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

import WorkedHour from 'App/Models/WorkedHour'

export default class WorkedHoursController {
  public async index({ response, auth }: HttpContextContract) {
    const u = await auth.authenticate()
    const user = await User.find(u.id)
    const t = user?.related('workedHours').query()
    return response.json({ t })
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
      return response.status(error.status).json({ msg: 'deu ruim' })
    }
  }
}
