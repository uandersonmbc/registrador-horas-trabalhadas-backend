import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'
export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const data = await User.all()
    return response.json(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        email: schema.string(), // 👈 convert to number and validate
        password: schema.string(), // 👈 convert to number and validate
      }),
    })

    const data = request.only(['email', 'password'])

    const user = await User.create(data)
    return response.json(user)
  }
}
