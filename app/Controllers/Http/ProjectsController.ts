import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    const data = await Project.all()
    return response.json(data)
  }
}
