import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Activity from 'App/Models/Activity'

export default class ActivitiesController {
  public async index({ response }: HttpContextContract) {
    const data = await Activity.all()
    return response.json(data)
  }
}
