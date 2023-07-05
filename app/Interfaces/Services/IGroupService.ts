import { Group } from "../Group"

export default interface IExpenseService {
  getGroups(): Promise<Group[]>
  getGroup(id: number): Promise<Group | null>
}