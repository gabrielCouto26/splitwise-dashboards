import Expense from "App/Models/Expense";

export default class ExpenseRepository {
  constructor() {}

  async getById(expenseId: number): Promise<Expense | null> {
    return await Expense.find(expenseId);
  }

  async getAll(filters: Record<string, any>): Promise<Expense[]> {
    let query = Expense
      .query()
      .whereNull("deleted_at");

    if (filters.groupId) {
      query = query.where("group_id", filters.groupId);
    }

    if (filters.month) {
      query = query
        .select('id', 'description', 'details')
        .groupByRaw("id, description, details, MONTH(date)")
        .orderByRaw("MONTH(date) asc")
        .sum('cost');
    }

    return await query.paginate(filters.page, 10)
  }
}