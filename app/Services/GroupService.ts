import IGroupService from 'App/Interfaces/Services/IGroupService';
import ISplitwiseClient from 'App/Interfaces/Integrators/ISplitwiseClient';
import { Group } from 'App/Interfaces/Group';

export default class GroupService implements IGroupService {
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
}