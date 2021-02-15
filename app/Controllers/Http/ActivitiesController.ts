import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Activity from 'App/Models/Activity'

export default class ActivitiesController {
  public async index({ response, auth }: HttpContextContract) {
    await auth.authenticate()
    try {
      const data = await Activity.all()
      return response.json(data)
    } catch (error) {
      return response.status(500).json({
        msg: 'Não foi possível buscar os dados',
        error: { message: error.message },
      })
    }
  }
}
