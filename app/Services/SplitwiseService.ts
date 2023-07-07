import ISplitwiseClient from 'App/Interfaces/Integrators/ISplitwiseClient';
import { Expense as IExpense } from 'App/Interfaces/Expense';
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class SplitwiseService {
  private splitwiseClient: ISplitwiseClient
  private Expense: typeof BaseModel

  constructor({ SplitwiseClient, Expense }) {
    this.splitwiseClient = SplitwiseClient
    this.Expense = Expense
  }

  async loadExpenses(): Promise<boolean>{
    try {
      const expenses = await this.splitwiseClient.getExpenses()
      const reducedExpenses = expenses.map(e => this.destructureExpense(e))
      await this.Expense.fetchOrCreateMany('id', reducedExpenses)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  private destructureExpense(expense: IExpense): IExpense {
    const {
      id,group_id,description,details,cost,date,created_at,updated_at,deleted_at
    } = expense
    return { id,group_id,description,details,cost,date,created_at,updated_at,deleted_at }
  }
}