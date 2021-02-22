import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Month from 'App/Models/Month'

export default class MonthsController {
  public async index({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    console.log(request.)
    try {
      const year = request.param('year') || new Date().getFullYear()
      const months = await Month.query().where('year', year)
      return response.json(months)
    } catch (error) {}
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    await request.validate({
      schema: schema.create({
        year: schema.number(),
        month: schema.number(),
        amount_hours: schema.number(),
        contract_type_id: schema.number(),
      }),
    })
    const data = request.only(['year', 'month', 'amount_hours', 'contract_type_id'])

    try {
      const find = await Month.query()
        .where('year', data.year)
        .andWhere('month', data.month)
        .andWhere('contract_type_id', data.contract_type_id)
        .first()

      if (!find) {
        const month = await Month.create(data)
        return response.json(month)
      } else {
        return response.status(401).json({ message: 'Esse mês já está cadastrado' })
      }
    } catch (error) {
      return response.status(500).json({ message: 'Deu ruim' })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const id = request.param('id')
    await request.validate({
      schema: schema.create({
        year: schema.number(),
        month: schema.number(),
        amount_hours: schema.number(),
      }),
    })
    const data = request.only(['year', 'month', 'amount_hours'])
    try {
      const month = await Month.findOrFail(id)
      month.merge(data)
      await month.save()
      return response.json(month)
    } catch (error) {
      return response.status(500).json({ message: 'Deu ruim' })
    }
  }
}
