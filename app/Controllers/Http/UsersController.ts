import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * register
   */
  public async register({ request, response }: HttpContextContract) {
    const { email, password } = request.body()

    if (!email || !password)
      return response.status(403).json({ message: 'email and password is required' })

    const existingUser = await User.findBy('email', email)

    if (existingUser) return response.status(403).json({ message: 'email is already registered' })

    try {
      await User.create({ email: email, password })

      return response.status(200).json({ message: 'sussess' })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  /**
   * login
   */
  public async login({ request, response, auth }: HttpContextContract) {
    const body = request.body()
    const email = body?.email
    const password = body?.password

    if (!email || !password)
      return response.status(403).json({ message: 'email and password is required' })

    try {
      const authProcess = await auth.use('api').attempt(email, password)
      return response.status(200).json({ token: authProcess.token })
    } catch (error) {
      return response.unauthorized({ message: error })
    }
  }

  /**
   * logout
   */
  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.status(200).json({ message: 'success logout' })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
