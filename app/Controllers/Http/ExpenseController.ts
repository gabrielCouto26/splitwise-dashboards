import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IExpenseService from 'App/Interfaces/Services/IExpenseService'

export default class ExpenseController {
  private swService: IExpenseService

  constructor ({ ExpenseService }) {
    this.swService = ExpenseService
  }

  public async index ({ inertia }: HttpContextContract) {
    let groups = await this.swService.getGroups()
    return inertia.render('Home', { groups })
  }
  
  public async show ({ inertia, params }: HttpContextContract) {
    let group = await this.swService.getGroup(params.id)
    let expenses = await this.swService.getExpenses(group?.id)
    return inertia.render('Group', { group, expenses })
  }
}
