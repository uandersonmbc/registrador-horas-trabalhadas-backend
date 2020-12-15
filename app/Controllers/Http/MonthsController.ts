import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Month from 'App/Models/Month'

export default class MonthsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await request.validate({
      schema: schema.create({
        year: schema.number(),
        month: schema.number(),
        amount_hours: schema.number(),
      }),
    })
    const data = request.only(['year', 'month', 'amount_hours', 'user_id'])
    // data.user_id = user.id

    try {
      const month = await Month.create(data)
      return response.json(month)
    } catch (error) {
      return response.status(500).json({ msg: 'Deu ruim' })
    }
  }
}
