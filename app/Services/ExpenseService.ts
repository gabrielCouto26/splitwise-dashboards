import IExpenseService from 'App/Interfaces/Services/IExpenseService';
import ISplitwiseClient from 'App/Interfaces/Integrators/ISplitwiseClient';
import { Expense as IExpense } from 'App/Interfaces/Expense';
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class ExpenseService implements IExpenseService {
  private splitwiseClient: ISplitwiseClient
  private Expense: typeof BaseModel

  constructor({ SplitwiseClient, Expense }) {
    this.splitwiseClient = SplitwiseClient
    this.Expense = Expense
  }

  async getById(expenseId: number): Promise<IExpense | null> {
    return await this.splitwiseClient.getExpense(expenseId)
  }

  async getAll(): Promise<IExpense[]> {
    const expenses = await this.splitwiseClient.getExpenses()
    expenses.forEach(async e => await this.create(e))
    return expenses
  }

  async create(expense: IExpense) {
    const newExpense = this.destructureExpense(expense)
    await this.Expense.firstOrCreate(
      { id: newExpense.id }, newExpense)
  }

  private destructureExpense(expense: IExpense): IExpense {
    const {
      id,group_id,description,details,cost,date,created_at,updated_at,deleted_at
    } = expense
    return { id,group_id,description,details,cost,date,created_at,updated_at,deleted_at }
  }
}