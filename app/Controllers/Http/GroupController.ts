import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import SplitwiseService from 'App/Services/SplitwiseService'

export default class GroupController {
  private swService: SplitwiseService

  constructor () {
    this.swService = new SplitwiseService(Env.get('SPLITWISE_API_KEY', ''))
  }

  public async index ({ inertia }: HttpContextContract) {
    let groups = await this.swService.getGroups()
    return inertia.render('Home', { groups })
  }
  
  public async show ({ inertia, params }: HttpContextContract) {
    let group = await this.swService.getGroup(params.id)

    return inertia.render('Group', { group })
  }
}
