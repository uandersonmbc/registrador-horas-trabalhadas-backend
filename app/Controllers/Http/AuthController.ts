import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async user({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.authenticate()

      const [data] = await Database.from('api_tokens')
        .where('user_id', '=', user.id)
        .orderBy('created_at', 'desc')
        .limit(1)
      await Database.from('api_tokens').where('token', '<>', data.token).delete()
      return response.json(user)
    } catch (error) {
      return response
        .status(error.status)
        .json({ message: 'Erro ao buscar informações do usuário' })
    }
  }

  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password, { name: email })
    return token.toJSON()
  }
}
