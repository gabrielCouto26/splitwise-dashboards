import IExpenseService from 'App/Interfaces/Services/IExpenseService';
import { Expense as IExpense } from 'App/Interfaces/Expense';

export default class ExpenseService implements IExpenseService {
  private expenseRepository

  constructor({ ExpenseRepository }) {
    this.expenseRepository = new ExpenseRepository()
  }

  async getById(expenseId: number): Promise<IExpense | null> {
    return await this.expenseRepository.getById(expenseId)
  }

  async getAll(filters: Record<string, any>): Promise<IExpense[]> {
    if (!filters.page)
      filters.page = 1

    return await this.expenseRepository.getAll(filters)
  }
}