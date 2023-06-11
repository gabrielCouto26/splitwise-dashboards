import Env from '@ioc:Adonis/Core/Env'
import ISplitwiseClient from '../Interfaces/Integrators/ISplitwiseClient';
import IHttpClient from 'App/Interfaces/Http/IHttpClient';
import { Group } from '../Interfaces/Group';
import { Expense } from '../Interfaces/Expense';

export default class SplitwiseClient implements ISplitwiseClient {
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

  async getExpenses(): Promise<Expense[]> {
    let expenses: Expense[] = []
    await this.httpClient
      .get('/get_expenses')
      .then(res => {
        expenses = res.data.expenses
      })
      .catch(error => console.log(error))

    return expenses
  }
}