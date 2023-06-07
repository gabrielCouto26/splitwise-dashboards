import { Expense } from './Expense'
import { Member } from './Member'

export interface Group {
  id: number
  name: string
  created_at: string
  updated_at: string
  members: Array<Member>
  simplify_by_default: boolean
  original_debts: Array<Expense>
  simplified_debts: Array<Expense>
  whiteboard: string
  group_type: string
  invite_link: string
  group_reminders: any
  avatar: any
  custom_avatar: boolean
}
