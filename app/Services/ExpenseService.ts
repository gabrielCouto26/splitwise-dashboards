import IExpenseService from 'App/Interfaces/Services/IExpenseService';
import ISplitwiseClient from 'App/Interfaces/Integrators/ISplitwiseClient';
import { Group } from 'App/Interfaces/Group';
import { Expense as IExpense } from 'App/Interfaces/Expense';

export default class ExpenseService implements IExpenseService {
  private splitwiseClient: ISplitwiseClient
  private expense: any

  constructor({ SplitwiseClient, Expense }) {
    this.splitwiseClient = SplitwiseClient
    this.expense = Expense
  }

  async getGroup(id: number): Promise<Group | null> {
    return await this.splitwiseClient.getGroup(id)
  }

  async getGroups(): Promise<Group[]> {
    return await this.splitwiseClient.getGroups()
  }

  async getExpense(expenseId: number): Promise<IExpense | null> {
    return await this.splitwiseClient.getExpense(expenseId)
  }

  async getExpenses(groupId?: number): Promise<IExpense[]> {
    let expenses = await this.splitwiseClient.getExpenses()
    try {
      expenses.forEach(async expense => {
        const {
          id,group_id,description,details,cost,date,created_at,updated_at,deleted_at
        } = expense
        await this.expense.updateOrCreate(
          { id },
          { id,group_id,description,details,cost,date,created_at,updated_at,deleted_at }
          )
      })
    } catch (error) {
      console.error('error', error)
    }
    return expenses
  }
}