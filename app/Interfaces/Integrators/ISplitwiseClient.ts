import { Expense } from "../Expense"
import { Group } from "../Group"

export default interface ISplitwiseService {
  getGroups(): Promise<Group[]>
  getGroup(id: number): Promise<Group | null>
  getExpenses(): Promise<Expense[]>
  getExpense(expenseId: number): Promise<Expense | null>
}