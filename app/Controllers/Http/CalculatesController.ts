import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import CalculatesServices from 'App/Services/Calculates'

export default class CalculatesController {
  public async bankHours({ auth, response }: HttpContextContract) {
    await auth.authenticate()
    try {
      const users = await User.all()
      const instance = new CalculatesServices()
      let exec = 0
      let a: any = []
      for (const user of users) {
        const result = await instance.cal(user)
        result && exec++
        a.push(result)
      }

      return response.json({ exec, a })
    } catch (error) {
      return response.status(500).json({
        msg: 'Não foi possível buscar os dados do dia',
        error: { message: error.message },
      })
    }
  }
}
