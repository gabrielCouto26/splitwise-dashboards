import { Group } from '../Interfaces/Group';
import ISplitwiseService from '../Interfaces/Services/ISplitwiseService';
import { Expense } from '../Interfaces/Expense';
import axios from 'axios';

export default class SplitwiseService implements ISplitwiseService {

  private baseUrl = 'https://secure.splitwise.com/api/v3.0'

  private headers = {
    'Authorization': `Bearer `,
    'Content-Type': 'application/json'
  }

  constructor(SPLITWISE_API_KEY: string) {
    if (!SPLITWISE_API_KEY)
      throw new Error('SPLITWISE_API_KEY is required')

    this.headers.Authorization += SPLITWISE_API_KEY
  }

  async getGroup(id: number): Promise<Group | null> {
    let group = null
    await axios
      .get(`${this.baseUrl}/get_group/${id}`, { headers: this.headers })
      .then(res => {      
        group = res.data.group
      })
      .catch(error => console.log(error))

    return group
  }

  async getGroups(): Promise<Group[]> {
    let groups = []
    await axios
      .get(`${this.baseUrl}/get_groups`, { headers: this.headers })
      .then(res => {
        console.log('res', res)
        groups = res.data.groups
      })
      .catch(error => console.log(error))

    return groups
  }

  getExpense(groupId: number, expenseId: number): Promise<Expense> {
    throw new Error('Method not implemented.');
  }

  getExpenses(groupId: number): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
}