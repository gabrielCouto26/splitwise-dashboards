import Env from '@ioc:Adonis/Core/Env'
import ISplitwiseService from '../Interfaces/Services/ISplitwiseService';
import IHttpClient from 'App/Interfaces/Http/IHttpClient';
import { Group } from '../Interfaces/Group';
import { Expense } from '../Interfaces/Expense';

export default class SplitwiseService implements ISplitwiseService {
  private httpClient: IHttpClient

  constructor({ HttpClient }) {
    const BASE_URL = Env.get('SPLITWISE_BASE_URL', '')
    const API_KEY = Env.get('SPLITWISE_API_KEY', '')
    this.httpClient = HttpClient({
      baseURL: BASE_URL, bearerToken: API_KEY })
  }

  async getGroup(id: number): Promise<Group | null> {
    let group = null

    await this.httpClient
      .get('/get_group/' + id)
      .then(res => {
        group = res.data.group
      })
      .catch(error => console.log(error))

    return group
  }

  async getGroups(): Promise<Group[]> {
    let groups = []
    await this.httpClient
      .get('/get_groups')
      .then(res => {
        groups = res.data.groups
      })
      .catch(error => console.log(error))

    return groups
  }

  async getExpense(expenseId: number): Promise<Expense | null> {
    let expense: Expense | null = null
    await this.httpClient
      .get('/get_expense/' + expenseId)
      .then(res => {
        expense = res.data.expense
      })
      .catch(error => console.log(error))

    return expense
  }

  async getExpenses(groupId?: number): Promise<Expense[]> {
    let expenses: Expense[] = []
    await this.httpClient
      .get('/get_expenses')
      .then(res => {
        expenses = res.data.expenses
      })
      .catch(error => console.log(error))

    if (groupId)
      return expenses.filter(expense => expense.group_id === groupId)

    return expenses
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