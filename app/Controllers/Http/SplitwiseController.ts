import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SplitwisesController {
  public async index ({}: HttpContextContract) {
    const Splitwise = require('splitwise')
    const sw = Splitwise({
      consumerKey: 'RhzqPv9VOvUAhUWiE9PmYmxmaJH2C55vXIcB192C',
      consumerSecret: 'GwWFVSoBKxKhyCSH43fPi7bx9Tx14GL9SnYFwMXQ',
    })

    sw
      .getExpenses({ group_id: '47148482' })
      .then(res => console.log('getExpenses', res))
      .catch(error => console.log(error))
  }
}
