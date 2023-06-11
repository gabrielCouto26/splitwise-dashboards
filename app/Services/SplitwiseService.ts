import ISplitwiseService from '../Interfaces/Services/ISplitwiseService';
import ISplitwiseClient from '../Interfaces/Integrators/ISplitwiseClient';
import { Group } from '../Interfaces/Group';
import { Expense } from '../Interfaces/Expense';

export default class SplitwiseService implements ISplitwiseService {
  private splitwiseClient: ISplitwiseClient

  constructor({ SplitwiseClient }) {
    this.splitwiseClient = SplitwiseClient
  }

  async getGroup(id: number): Promise<Group | null> {
    return await this.splitwiseClient.getGroup(id)
  }

  async getGroups(): Promise<Group[]> {
    return await this.splitwiseClient.getGroups()
  }

  async getExpense(expenseId: number): Promise<Expense | null> {
    return await this.splitwiseClient.getExpense(expenseId)
  }

  async getExpenses(groupId?: number): Promise<Expense[]> {
    let expenses = await this.splitwiseClient.getExpenses()

    // Retorna despesas tratadas
    return expenses.filter(expense => {
      // Ignora despesas de pagamento e excluídas
      if (expense.description === 'Payment' || expense.deleted_at)
        return false

      // Filtra despesas por grupo
      if (expense.group_id === groupId)
        return true

      return false
    })
  }

  aggregateExpenses(expenses: Expense[]): { [key: string]: number } {
    let expensesCopy = [...expenses]
    let groupedExpenses: { [key: string]: number } = {}
    let aggregatedExpenses = [
      'Aluguel',
      'Mercado',
      'Compras',
      'Contas',
      'IFood'
    ]

    expensesCopy.forEach(expense => {
      // Define descrição padrão
      if (!expense.description)
        expense.description = 'Outros'

      // Define chave do objeto
      let key = aggregatedExpenses.includes(expense.description) ?
        expense.description : 'Outros'

      // Agrega despesas
      let cost = parseFloat(expense.cost || '0')
      if (groupedExpenses[key])
        groupedExpenses[key] += cost
      else
        groupedExpenses[key] = cost

      // Arredonda valores
      for (let expense in groupedExpenses)
        groupedExpenses[expense] = parseFloat(groupedExpenses[expense].toFixed(2))

      // Ordena objeto por valor decrescente
      groupedExpenses = Object.fromEntries(
        Object.entries(groupedExpenses)
          .sort(([, a], [, b]) => b - a)
      )
    })

    return groupedExpenses
  }
}