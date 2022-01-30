import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    return response.ok({ data: await User.all() })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return response.ok({ data: user })
  }

  public async store({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      username: schema.string(),
      phone: schema.string(),
      password: schema.string(),
    })
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    return response.created({ message: 'created user', data: user })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const validations = await schema.create({
      email: schema.string(),
      username: schema.string(),
      phone: schema.string(),
    })
    const req = await request.validate({ schema: validations })
    user.merge(req)
    user.save()
    return response.created({ message: 'updated user', data: user })
  }

  public async destroy({ response, params }: HttpContextContract){
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.ok({ message: 'deleted user', data: user })
  }
}
