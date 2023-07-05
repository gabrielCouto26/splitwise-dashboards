import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Expense extends BaseModel {
  @column()
  public id: number

  @column()
  public group_id?: number | null

  @column()
  public description?: string | null

  @column()
  public details?: string | null

  @column()
  public cost?: string | null

  @column()
  public date: string

  @column()
  public created_at?: string | null

  @column()
  public updated_at?: string | null

  @column()
  public deleted_at?: string | null
}
