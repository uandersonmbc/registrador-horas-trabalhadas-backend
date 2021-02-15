import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index({ response, auth }: HttpContextContract) {
    await auth.authenticate()
    try {
      const data = await Project.all()
      return response.json(data)
    } catch (error) {
      return response.status(500).json({
        msg: 'Não foi possível buscar os dados',
        error: { message: error.message },
      })
    }
  }
}
