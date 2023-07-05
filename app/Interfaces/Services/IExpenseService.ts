import { Expense } from "../Expense"
import { Group } from "../Group"

export default interface IExpenseService {
  getGroups(): Promise<Group[]>
  getGroup(id: number): Promise<Group | null>
  getExpenses(groupId?: number): Promise<Expense[]>
  getExpense(expenseId: number): Promise<Expense | null>
}