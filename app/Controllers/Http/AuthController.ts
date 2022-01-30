import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string(),
      username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
      phone: schema.string(),
    })
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    return response.created({ message: 'created user', data: user })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const password = await request.input('password')
    const email = await request.input('email')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours',
      })
      return token.toJSON()
    } catch {
      return response.badRequest({ message: 'error unauthorized' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }

  public async me({ auth, response }: HttpContextContract) {
    if (auth.user) {
      return auth.user
    }
    return response.ok({ message: 'no pasa nada' })
  }
}
