import { Member } from './Member'
import { Repayment } from './Repayment'

export interface Expense {
  id: number
  group_id: number | null
  friendship_id: number | null
  expense_bundle_id: number | null
  description: string | null
  repeats: boolean | null
  repeat_interval: any | null
  email_reminder: boolean | null
  email_reminder_in_advance: any | null
  next_repeat: any | null
  details: string | null
  comments_count: number | null
  payment: boolean | null
  creation_method: string | null
  transaction_method: string | null
  transaction_confirmed: boolean | null
  transaction_id: number | null
  transaction_status: string | null
  cost: string | null
  currency_code: string | null
  repayments: Array<Repayment> | null
  date: string
  created_at: string | null
  created_by: Member
  updated_at: string | null
  updated_by: Member
  deleted_at: string | null
  deleted_by: Member
  category: {
    id: number,
    name: string,
  }
  receipt: {
    large: any,
    original: any,
  }
  users: Array<any>
}
