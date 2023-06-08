import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ISplitwiseService from 'App/Interfaces/Services/ISplitwiseService'

export default class GroupController {
  private swService: ISplitwiseService

  constructor ({ SplitwiseService }) {
    this.swService = SplitwiseService
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
