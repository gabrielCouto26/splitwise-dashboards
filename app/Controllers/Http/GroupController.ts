import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SplitwiseFactory from 'App/Factories/SplitwiseFactory'
import Splitwise from 'splitwise'

export default class GroupController {
  private sw: Splitwise

  constructor () {
    this.sw = SplitwiseFactory.getInstance()
  }

  public async index ({ inertia }: HttpContextContract) {
    let groups = []
    await this.sw
      .getGroups()
      .then(res => groups = res)
      .catch(error => console.log(error))

    return inertia.render('Home', { groups })
  }
  
  public async show ({ inertia, params }: HttpContextContract) {
    let group = {}
    await this.sw
      .getGroup(params.id)
      .then(res => group = res)
      .catch(error => console.log(error))

    return inertia.render('Group', { group })
  }
}
