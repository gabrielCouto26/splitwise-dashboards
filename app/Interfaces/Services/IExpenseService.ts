import { Expense as IExpense } from "../Expense"

export default interface IExpenseService {
  getById(expenseId: number): Promise<IExpense | null>
  getAll(filters: Record<string, any>): Promise<IExpense[]>
}