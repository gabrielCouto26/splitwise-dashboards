import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IExpenseService from 'App/Interfaces/Services/IExpenseService'
import IGroupService from 'App/Interfaces/Services/IGroupService'

export default class GroupController {
  private groupService: IGroupService
  private expenseService: IExpenseService

  constructor ({ GroupService, ExpenseService }) {
    this.groupService = GroupService
    this.expenseService = ExpenseService
  }

  public async index ({ inertia }: HttpContextContract) {
    let groups = await this.groupService.getGroups()
    return inertia.render('Home', { groups })
  }
  
  public async show ({ inertia, params }: HttpContextContract) {
    let group = await this.groupService.getGroup(params.id)
    let expenses = await this.expenseService.getExpenses(group?.id)
    return inertia.render('Group', { group, expenses })
  }
}
